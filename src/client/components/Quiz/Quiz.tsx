import { ParsedQuestion, AnsweredQuestion, Summary } from "models";
import * as React from "react";
import DefaultButton from "../DefaultButton/DefaultButton";
import Question from "../Question/Question";
import { STORE_QUESTION } from "../../../constants";
import { observer, inject } from "mobx-react";
import { QuestionStore } from "client/stores";
import SummaryDetail from "../SummaryDetail/SummaryDetail";
import './Quiz.scss';

export interface Props { }

export interface State {
  complete: boolean;
  questions: ParsedQuestion[];
  quizLength: number;
  currentQuestionId: number;
  currentQuestionIndex: number;
  currentQuestion: ParsedQuestion | null;
  answeredQuestions: AnsweredQuestion[];
  summary: Summary | null;
}

const QuizStep = ({ complete, question, onClick, onChange, summary }) => {

  if (complete) {
    return <SummaryDetail onClick={onClick} summary={summary}></SummaryDetail>
  }

  if (question) {
    return <Question
      id={question.id}
      questionType={question.type}
      question={question.question}
      options={question.answers ? question.answers : []}
      correctAnswer={question.correctAnswer}
      onClick={onClick}
      onChange={onChange}
    />
  } else {
    return (<div className="navigationBox">
      <DefaultButton onClick={(e) => onClick('start')}>Start Quiz</DefaultButton>
    </div>);
  }
};

@inject(STORE_QUESTION)
@observer
export class Quiz extends React.Component<Props, State> {

  questionStore = this.props[STORE_QUESTION] as QuestionStore;

  constructor(props: Props) {
    super(props);
    this.state = {
      complete: false,
      questions: this.questionStore.questions,
      quizLength: this.questionStore.questions.length,
      currentQuestionId: 1,
      currentQuestionIndex: 1,
      currentQuestion: null,
      answeredQuestions: [],
      summary: null
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setInitialQuestion = this.setInitialQuestion.bind(this);
    this.setQuestion = this.setQuestion.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.initQuiz();
  }

  async initQuiz() {
    await this.questionStore.read(e => {
      this.resetQuiz(e)
    });
  }

  resetQuiz(initialQuestionId: number) {
    this.setState(
      {
        complete: false,
        questions: this.questionStore.questions,
        quizLength: this.questionStore.questions.length,
        currentQuestionId: initialQuestionId,
        currentQuestionIndex: 1,
        currentQuestion: null,
        answeredQuestions: [],
        summary: null
      }, () => {
        this.setInitialQuestion();
      }
    );
  }

  generateSummary() {
    const correct = this.state.answeredQuestions.filter(f => f.answer === f.correctAnswer).length;
    const wrong = this.state.answeredQuestions.filter(f => f.answer !== f.correctAnswer).length;
    const count = this.state.answeredQuestions.length;
    const score = (correct / count) * 100;
    return { correct: correct, wrong: wrong, count: count, score: isNaN(score) ? 0 : Math.round(score) };
  }

  nextQuestion() {
    if (this.state.currentQuestionIndex === this.state.quizLength) {
      this.setState({ summary: this.generateSummary(), complete: true }, () => { });
    } else {
      this.setState({ complete: false, currentQuestionIndex: this.state.currentQuestionIndex + 1, currentQuestionId: this.state.currentQuestionId + 1 }, () => {
        this.setQuestion(this.state.currentQuestionId);
      });
    }
  }

  setInitialQuestion() {
    const initialQuestion = this.questionStore.questions.find(f => f.id === this.state.currentQuestionId);
    if (initialQuestion) {
      this.setState({ currentQuestion: initialQuestion, quizLength: this.questionStore.questions.length }, () => { });
    }
  }

  setQuestion(questionId: number) {
    const currentQuestion = this.questionStore.questions.find(f => f.id === questionId);
    if (currentQuestion) {
      this.setState({ currentQuestion: currentQuestion });
    }
  }

  async handleClick(e) {
    switch (e) {
      case 'start':
        this.setInitialQuestion();
        break;
      case 'next':
        this.nextQuestion();
        break;
      case 'restart':
        await this.questionStore.read(e => {
          this.resetQuiz(e);
        });
        break;
    }
  }

  handleOnChange(e: AnsweredQuestion) {
    const existingAnswer = this.state.answeredQuestions.find(f => f.questionId === e.questionId);
    if (existingAnswer) {
      existingAnswer.answer = e.answer;
    } else {
      this.state.answeredQuestions.push(e);
    }
  }

  render() {
    return (
      <div className="quiz-step">
        <QuizStep
          complete={this.state.complete}
          question={this.state.currentQuestion}
          onClick={(e) => this.handleClick(e)}
          onChange={(e) => this.handleOnChange(e)}
          summary={this.state.summary}
        />
      </div>
    );
  }

}

export default Quiz;
