import { Injectable } from "@angular/core";
import { AppSettings } from "src/app/Static/constants/appsetting";
import { QuestionModel } from "../models/question.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class QuestionUpdateService {
  questionTeam1 = AppSettings.QUESTIONTEAM1;
  questionTeam2 = AppSettings.QUESTIONTEAM2;
  questionResponse = AppSettings.QUESTIONSRESPONSE;
  questionTableData = AppSettings.QUESTIONSRESPONSE;
  questionTeam = this.questionResponse;

  constructor(private http: HttpClient) {}

  setDatabaseName(teamName: string) {
    if (teamName === "teamA") {
      this.questionTeam = this.questionTeam1;
    } else {
      this.questionTeam = this.questionTeam2;
    }
  }

  fetchQuestions() {
    return this.http.get<QuestionModel[]>(
      `http://localhost:3000/${this.questionTeam}`
    );
  }

  deleteQuestion(id: number) {
    return this.http.delete(`http://localhost:3000/${this.questionTeam}/${id}`);
  }

  addQuestion(payload: QuestionModel) {
    return this.http.post<QuestionModel>(
      `http://localhost:3000/${this.questionTeam}`,
      payload
    );
  }

  updateQuestion(payload: QuestionModel, id: number) {
    return this.http.put<QuestionModel>(
      `http://localhost:3000/${this.questionTeam}/${id}`,
      payload
    );
  }
}
