import { observable } from "mobx";
import { ParsedQuestion, Question } from "models";
import { QuestionService } from "../services";

export class QuestionStore {
  constructor(readonly service: QuestionService) {
    this.questions = [];
    this.service = service;
  }

  @observable public status: string = "initial";

  @observable public questions: Array<ParsedQuestion> = observable([]);

  async read(reaction: Function) {
    try {
      await this.service.get("page=3").then(data => {
        this.questions = this.parseQuestions(data.results);
        const ids = this.questions.map(m => m.id);
        reaction(ids[0]);
        this.status = "success";
      });
    } catch (error) {
      this.status = "error";
    }
  }

  parseQuestions(questions: Question[]): ParsedQuestion[] {
    return questions.map(question => {
      return this.parseQuestion(question);
    });
  }

  parseQuestion(question: Question) {
    return new ParsedQuestion(question);
  }
}

export default QuestionStore;
