// import { observable } from "mobx";
import { Difficulty, Type } from "../types";

// export class ParsedQuestion {
//   readonly id: number;
//   readonly category: string;
//   readonly type: Type;
//   readonly difficulty: Difficulty;
//   readonly question: string;
//   readonly answers?: string[] | null;
//   @observable public response: string | boolean | null;

//   constructor(question: Question) {
//     this.id = ParsedQuestion.generateId();
//     this.category = question.category;
//     this.type = question.type;
//     this.difficulty = question.difficulty;
//     this.question = this.unescapeContent(question.question);
//     this.answers =
//       question.type === "multiple" ? this.generateAnswers(question) : null;
//     this.response = null;
//   }

//   static nextId = 1;
//   static generateId() {
//     return this.nextId++;
//   }

//   unescapeContent(text: string): string {
//     return text.replace(/&quot;/g, `"`).replace(/&#039;/g, `'`);
//   }

//   generateAnswers(question: Question): string[] {
//     const answers = question.incorrect_answers as string[];
//     answers.push(question.correct_answer as string);
//     return answers;
//   }

//   validate() {
//     return !this.response;
//   }
// }

export class Question {
  readonly id: number;
  readonly category: string;
  readonly type: Type;
  readonly difficulty: Difficulty;
  readonly question: string;
  readonly correct_answer: string | boolean;
  readonly incorrect_answers?: string[] | boolean[] | null;

  constructor(
    category: string,
    type: Type,
    difficulty: Difficulty,
    question: string,
    correct_answer: string | boolean,
    incorrect_answers?: string[] | boolean[] | null
  ) {
    this.id = Question.generateId();
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correct_answer;
    this.incorrect_answers = incorrect_answers ?? null;
  }

  static nextId = 1;
  static generateId() {
    return this.nextId++;
  }
}

export default Question;
