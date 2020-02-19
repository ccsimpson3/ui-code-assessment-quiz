import React from "react";
import DefaultButton from "../DefaultButton/DefaultButton";
import RadioGroup from "../RadioGroup/RadioGroup";
import TextBox from "../TextBox/TextBox";
import "./Question.scss";

type State = {
  valid: boolean;
  answer: string | boolean | null;
};

type Props = {
  id: number;
  questionType: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  onClick: Function;
  onChange: Function;
};

const MultipleChoiceAnswer = ({ questionId, options, onClick, onChange }) => {
  return <RadioGroup name={questionId} options={options} onClick={onClick} onChange={onChange}></RadioGroup>
}

const BooleanAnswer = ({ questionId, onClick, onChange }) => {
  return <RadioGroup name={`question-options-${questionId}`} options={["True", "False"]} onClick={onClick} onChange={onChange}></RadioGroup>
}

const TextAnswer = ({ questionId, onChange }) => {
  return <TextBox name={`question-answer-${questionId}`} onChange={onChange}></TextBox>
}

const Answers = ({ questionId, questionType, options, onClick, onChange }) => {
  switch (questionType) {
    case 'multiple':
      return <MultipleChoiceAnswer questionId={questionId} options={options} onClick={onClick} onChange={onChange}></MultipleChoiceAnswer>;
    case 'boolean':
      return <BooleanAnswer questionId={questionId} onClick={onClick} onChange={onChange}></BooleanAnswer>;
    case 'text':
      return <TextAnswer questionId={questionId} onChange={onChange}></TextAnswer>;
    default:
      return <TextAnswer questionId={questionId} onChange={onChange}></TextAnswer>;
  }
}

const QuestionContent = ({ id, questionType, question, options, onClick, onChange }) => {
  return (
    <div id={`question-${id}`} className="question-box">
      <div className="question-text">
        {question}
      </div>
      <div className="answers">
        <Answers questionId={id} questionType={questionType} options={options} onClick={onClick} onChange={onChange}></Answers>
      </div>
      <div className="navigation-box">
        <DefaultButton onClick={e => onClick('next')}>Next</DefaultButton>
      </div>
    </div>
  );
};

export class Question extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      valid: false,
      answer: null
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({ answer: e, valid: true });
    this.props.onChange({ questionId: this.props.id, answer: e, correctAnswer: this.props.correctAnswer });
  }

  render() {
    return (
      <QuestionContent
        id={this.props.id}
        questionType={this.props.questionType}
        question={this.props.question}
        options={this.props.options}
        onClick={this.props.onClick}
        onChange={this.handleOnChange}
      />
    );
  }
}

export default Question;



