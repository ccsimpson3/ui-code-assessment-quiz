import Question from "./Question.model";

export class Questions {
  readonly response_code: number;
  readonly results: Question[];

  constructor(response_code: number, results: Question[]) {
    this.response_code = response_code;
    this.results = results;
  }
}

export default Questions;
