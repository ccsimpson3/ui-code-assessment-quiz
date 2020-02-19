import { Type, Difficulty } from "types";
import Question from "./Question.model";

export class ParsedQuestion {
  readonly id: number;
  readonly category: string;
  readonly type: Type;
  readonly difficulty: Difficulty;
  readonly question: string;
  readonly answers?: string[] | null;
  readonly correctAnswer: string;

  constructor(question: Question) {
    this.id = ParsedQuestion.generateId();
    this.category = question.category;
    this.type = question.type;
    this.difficulty = question.difficulty;
    this.question = this.unescapeContent(question.question);
    this.answers =
      question.type === "multiple" ? this.generateAnswers(question) : null;
    this.correctAnswer = question.correct_answer.toString();
  }

  static nextId = 1;
  static generateId() {
    return this.nextId++;
  }

  unescapeContent(text: string): string {
    return text
      .replace(/&quot;/g, `"`)
      .replace(/&#039;/g, `'`)
      .replace(/&amp;/g, `&`);
  }

  generateAnswers(question: Question): string[] {
    const answers = (question.incorrect_answers as string[])?.map(m =>
      this.unescapeContent(m)
    );
    answers.push(this.unescapeContent(question.correct_answer as string));
    return answers;
  }
}

export default ParsedQuestion;
