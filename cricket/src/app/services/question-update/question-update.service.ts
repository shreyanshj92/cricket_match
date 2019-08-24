import { Injectable } from "@angular/core";
import { AppSettings } from "src/app/Static/constants/appsetting";
import { QuestionModel } from "../models/question.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class QuestionUpdateService {
  dummyQuestionTable = AppSettings.DUMMYQUESTIONTABLE;
  // dummyQuestionTable = AppSettings.QUESTIONSRESPONSE;
  questionTableData = AppSettings.QUESTIONSRESPONSE;

  constructor(private http: HttpClient) {}

  fetchQuestions() {
    return this.http.get<QuestionModel[]>(
      `http://localhost:3000/${this.dummyQuestionTable}`
    );
  }

  deleteQuestion(id: number) {
    return this.http.delete(
      `http://localhost:3000/${this.dummyQuestionTable}/${id}`
    );
  }

  addQuestion(payload: QuestionModel) {
    return this.http.post<QuestionModel>(
      `http://localhost:3000/${this.dummyQuestionTable}`,
      payload
    );
  }

  updateQuestion(payload: QuestionModel, id: number) {
    return this.http.put<QuestionModel>(
      `http://localhost:3000/${this.dummyQuestionTable}/${id}`,
      payload
    );
  }
}
