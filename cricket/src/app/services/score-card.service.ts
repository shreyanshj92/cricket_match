import { Injectable } from "@angular/core";
import { resp } from "./questions";
import { HttpClient } from "@angular/common/http";
import { QuestionModel } from "./models/question.model";
import { AppSettings } from "../Static/constants/appsetting";
import { ScoreboardService } from "./scoreboard/scoreboard.service";

@Injectable({
  providedIn: "root"
})
export class ScoreCardService {
  scoreCardObj = {
    totalRun: 0,
    totalBall: 0,
    totalWicket: 0,
    extraRun: 0,
    totalFours: 0,
    totalSixes: 0
  };
  teamData = [];

  teamPlayerScore = {
    teamName: "",
    playerScore: {
      name: "",
      run: 0,
      ball: 0,
      four: 0,
      six: 0,
      strikeRate: ""
    }
  };

  bowlerScore: any;
  // dummyQuestionTable = AppSettings.DUMMYQUESTIONTABLE;
  dummyQuestionTable = AppSettings.QUESTIONSRESPONSE;
  questionTableData = AppSettings.QUESTIONSRESPONSE;

  constructor(
    private http: HttpClient,
    private scoreboardService: ScoreboardService
  ) {}

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
      if (
        questionObj.answer.toLowerCase() === "wide ball" ||
        questionObj.answer.toLowerCase() === "no ball"
      ) {
        this.scoreCardObj.extraRun++;
      } else {
        this.teamPlayerScore.playerScore.ball++;
        this.scoreCardObj.totalBall++;
        this.teamPlayerScore.playerScore.strikeRate = (
          (this.teamPlayerScore.playerScore.run * 100) /
          this.teamPlayerScore.playerScore.ball
        ).toFixed(2);
      }
      if (questionObj.offeredRun) {
        this.scoreCardObj.totalRun =
          this.scoreCardObj.totalRun + questionObj.offeredRun;
        this.teamPlayerScore.playerScore.run =
          this.teamPlayerScore.playerScore.run + questionObj.offeredRun;
        if (questionObj.offeredRun === 4) {
          this.scoreCardObj.totalFours++;
          this.teamPlayerScore.playerScore.four++;
        }
        if (questionObj.offeredRun === 6) {
          this.scoreCardObj.totalSixes++;
          this.teamPlayerScore.playerScore.six++;
        }
      }
      if (questionObj.answer.toLowerCase() === "bowled") {
        this.scoreCardObj.totalWicket++;
        this.scoreboardService.addTeamPlayerScore(this.teamPlayerScore);
        this.teamPlayerScore.playerScore.run = 0;
        this.teamPlayerScore.playerScore.ball = 0;
        this.teamPlayerScore.playerScore.four = 0;
        this.teamPlayerScore.playerScore.six = 0;
        this.teamPlayerScore.playerScore.strikeRate = "";
      }
    }
    console.log("this.scoreCardObj", this.scoreCardObj, this.teamPlayerScore);
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
      if (Math.floor(this.scoreCardObj.totalBall / 6) < 6) {
        return (
          Math.floor(this.scoreCardObj.totalBall / 6) +
          "." +
          (this.scoreCardObj.totalBall % 6)
        );
      } else {
        return "Inning end";
      }
    } else {
      return "0.0";
    }
  }
  calStrikeRate(run: number, ball: number): string {
    return ((run / ball) * 100).toFixed(2);
  }
  addPlayerScore() {
    let getBowlers;

    if (Math.floor(this.scoreCardObj.totalBall / 6) < 6) {
      if (Math.floor(this.scoreCardObj.totalBall / 6) % 2 === 0) {
        return getBowlers[0];
      } else {
        return getBowlers[1];
      }
    }
  }
}
