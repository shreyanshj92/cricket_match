import { Injectable } from "@angular/core";
import { resp } from "./questions";

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

  constructor() {}

  getQuestions(): any {
    return resp;
  }

  getScore(): any {
    return this.scoreCardObj;
  }
  updateScore(questionObj: any): void {
    if (questionObj) {
      if (questionObj.question.toLowerCase() === "bowled") {
        this.scoreCardObj.totalWicket++;
      }
      if (questionObj.offeredRun) {
        this.scoreCardObj.totalRun =
          this.scoreCardObj.totalRun + questionObj.offeredRun;
      }
      if (
        questionObj.question.toLowerCase() === "wide ball" ||
        questionObj.question.toLowerCase() === "no ball"
      ) {
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
    const getBowlers = this.teamData.teamA.playerList.filter(
      player => player.role.toLowerCase() === "bowler"
    );

    if (Math.floor(this.scoreCardObj.totalBall / 6) < 6) {
      if (Math.floor(this.scoreCardObj.totalBall / 6) % 2 === 0) {
        return getBowlers[0];
      } else {
        return getBowlers[1];
      }
    }
  }
}
