import Questions from "models/Questions.model";

const webApiUrl = "http://localhost:4000/api/questions";

export class QuestionService {
  async get(params?: any | null): Promise<Questions> {
    const options = {
      method: "GET"
    };
    const request = new Request(webApiUrl + "?" + params, options);
    const response = await fetch(request);
    return response.json();
  }
}

export default QuestionService;
