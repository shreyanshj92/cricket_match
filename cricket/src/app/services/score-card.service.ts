import { Injectable } from "@angular/core";
import { resp } from "./questions";
import { HttpClient } from "@angular/common/http";
import { QuestionModel } from "./models/question.model";
import { AppSettings } from "../Static/constants/appsetting";

@Injectable({
  providedIn: "root"
})
export class ScoreCardService {
  scoreCardObj = {
    totalRun: 0,
    totalBall: 0,
    totalWicket: 0
  };
  teamData = [];
  playerScore: any;
  bowlerScore: any;
  dummyQuestionTable = AppSettings.DUMMYQUESTIONTABLE;
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

  getQuestions(): any {
    return resp;
  }

  getScore(): any {
    return this.scoreCardObj;
  }
  updateScore(questionObj: any): void {
    if (questionObj) {
      if (questionObj.answer.toLowerCase() === "bowled") {
        this.scoreCardObj.totalWicket++;
      }
      if (questionObj.offeredRun) {
        this.scoreCardObj.totalRun =
          this.scoreCardObj.totalRun + questionObj.offeredRun;
      }
      if (
        questionObj.answer.toLowerCase() === "wide ball" ||
        questionObj.answer.toLowerCase() === "no ball"
      ) {
        return;
      } else {
        this.scoreCardObj.totalBall++;
      }
    }
  }

  calRunRate(): string {
    if (this.scoreCardObj.totalRun && this.scoreCardObj.totalBall) {
      return (
        (this.scoreCardObj.totalRun * 6) /
        this.scoreCardObj.totalBall
      ).toFixed(1);
    } else {
      return;
    }
  }
  calOverCount(): string {
    if (this.scoreCardObj.totalBall) {
      return (
        Math.floor(this.scoreCardObj.totalBall / 6) +
        "." +
        (this.scoreCardObj.totalBall % 6)
      );
    } else {
      return "0.0";
    }
  }
  setTeamDetail(teamDetails: any) {
    this.teamData = teamDetails;
  }
  getTeamDetail(): any {
    return this.teamData;
  }
  addPlayerScore() {
    let getBowlers;
    // if (this.teamData) {
    //   getBowlers = this.teamData.teamA.playerList.filter(
    //     player => player.role.toLowerCase() === "bowler"
    //   );
    // }

    if (Math.floor(this.scoreCardObj.totalBall / 6) < 6) {
      if (Math.floor(this.scoreCardObj.totalBall / 6) % 2 === 0) {
        return getBowlers[0];
      } else {
        return getBowlers[1];
      }
    }
  }
}
