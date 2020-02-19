import { QuestionService } from "client/services";
import { STORE_QUESTION } from "../../constants";
import { QuestionStore } from "./QuestionStore";

export function createStore() {
  const questionStore = new QuestionStore(new QuestionService());
  return {
    [STORE_QUESTION]: questionStore
  };
}
