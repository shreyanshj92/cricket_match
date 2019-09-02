import { TeamScoreModel } from "src/app/services/models/teamScore.model";
import { AddTeamScore } from "./../+state/teamformation/teamformation.actions";
import { TeamformationService } from "./teamformation/teamformation.service";
import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import {
  TeamPlayerScoreBatsmanModel,
  TeamPlayerScoreBowlerModel
} from "./models/teamplayercore.model";
import {
  AddScorecard,
  AddBowlerScorecard
} from "../+state/scoreboard/scoreboard.actions";
import { Store } from "@ngxs/store";
import { TeamState } from "../+state/teamformation/teamformation.state";
import { QuestionUpdateService } from "./question-update/question-update.service";

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
  teams = [];
  teamDetails: any;
  teamScore: TeamScoreModel;
  teamWonToss: string;
  tossWinnerTeam: any;
  ballPerOver: number;
  overNumber = 6;

  teamBatsmanScore = {
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
  teamBowlerScore = {
    teamName: "",
    playerScore: {
      name: "",
      over: 0,
      run: 0,
      wicket: 0,
      economyRate: ""
    }
  };
  tossLosserTeam: any;
  teamSize: any;
  innigsChangeFlag: boolean;

  constructor(
    private http: HttpClient,
    private store: Store,
    private questionUpdateService: QuestionUpdateService,
    private teamformationService: TeamformationService
  ) {}
  fetchScorecard() {
    return this.http.get<TeamPlayerScoreBatsmanModel[]>(
      "http://localhost:3000/teamBatsmanScore"
    );
  }
  addScorecard(payload: TeamPlayerScoreBatsmanModel) {
    return this.http.post<TeamPlayerScoreBatsmanModel>(
      "http://localhost:3000/teamBatsmanScore",
      payload
    );
  }
  addBowlerScorecard(payload: TeamPlayerScoreBowlerModel) {
    return this.http.post<TeamPlayerScoreBowlerModel>(
      "http://localhost:3000/teamBowlerScore",
      payload
    );
  }

  getScore(): any {
    return this.scoreCardObj;
  }
  getPlayerScore() {
    return this.teamBatsmanScore;
  }

  updateScore(questionObj: any): void {
    if (questionObj) {
      if (
        questionObj.answer.toLowerCase() === "wide ball" ||
        questionObj.answer.toLowerCase() === "no ball"
      ) {
        this.scoreCardObj.extraRun++;
      } else {
        this.teamBatsmanScore.playerScore.ball++;
        this.scoreCardObj.totalBall++;
        this.ballPerOver++;
      }

      if (questionObj.offeredRun) {
        this.scoreCardObj.totalRun =
          this.scoreCardObj.totalRun + questionObj.offeredRun;
        this.teamBowlerScore.playerScore.run =
          this.teamBowlerScore.playerScore.run + questionObj.offeredRun;
        if (
          questionObj.answer.toLowerCase() === "wide ball" ||
          questionObj.answer.toLowerCase() === "no ball"
        ) {
          return;
        } else {
          this.teamBatsmanScore.playerScore.run =
            this.teamBatsmanScore.playerScore.run + questionObj.offeredRun;
        }

        if (questionObj.offeredRun === 4) {
          this.scoreCardObj.totalFours++;
          this.teamBatsmanScore.playerScore.four++;
        }
        if (questionObj.offeredRun === 6) {
          this.scoreCardObj.totalSixes++;
          this.teamBatsmanScore.playerScore.six++;
        }
      }
      if (questionObj.answer.toLowerCase() === "bowled") {
        this.scoreCardObj.totalWicket++;
        if (
          this.teamBatsmanScore.playerScore.run &&
          this.teamBatsmanScore.playerScore.ball
        ) {
          this.teamBatsmanScore.playerScore.strikeRate = this.calStrikeRate(
            this.teamBatsmanScore.playerScore.run,
            this.teamBatsmanScore.playerScore.ball
          );
        }
        this.store.dispatch(new AddScorecard(this.teamBatsmanScore));
        this.teamBatsmanScore.playerScore.run = 0;
        this.teamBatsmanScore.playerScore.ball = 0;
        this.teamBatsmanScore.playerScore.four = 0;
        this.teamBatsmanScore.playerScore.six = 0;
        this.teamBatsmanScore.playerScore.strikeRate = "";
      }
    }
    this.updateBatsmanScore();

    if (this.scoreCardObj.totalWicket <= this.teamSize - 1) {
      this.updateInnings();
    }
    // this.ballCount();
  }

  updateInnings() {
    this.scoreCardObj = {
      totalRun: 0,
      totalBall: 0,
      totalWicket: 0,
      extraRun: 0,
      totalFours: 0,
      totalSixes: 0
    };
    this.teamBatsmanScore = {
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
    this.teamScore.teamName = this.teamWonToss;
    this.teamScore.run = this.scoreCardObj.totalRun;
    this.teamScore.wicket = this.scoreCardObj.totalWicket;
    this.teamScore.over = this.calOverCount();
    this.store.dispatch(new AddTeamScore(this.teamScore));
    this.questionUpdateService.setDatabaseName("teamB");
  }

  updateBatsmanScore() {
    this.teamDetails.forEach(team => {
      this.teamSize = team.teamSize;
      this.teams.push(team.teamName);
      if (
        team.teamName === this.teamWonToss &&
        this.scoreCardObj.totalWicket < this.teamSize &&
        !this.innigsChangeFlag
      ) {
        this.teamBatsmanScore.teamName = team.teamName;
        return (this.teamBatsmanScore.playerScore.name =
          team.teamplayer[this.scoreCardObj.totalWicket].firstName);
      }
      if (
        team.teamName === this.teamWonToss &&
        this.scoreCardObj.totalWicket < this.teamSize &&
        this.innigsChangeFlag
      ) {
        this.teamBatsmanScore.teamName = team.teamName;
        return (this.teamBatsmanScore.playerScore.name =
          team.teamplayer[this.scoreCardObj.totalWicket].firstName);
      }
    });
    this.teams = [...new Set(this.teams)];
    console.log("this.tossLosserTeam", this.tossLosserTeam, this.teams);
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
        this.updateInnings();
        this.innigsChangeFlag = true;
        return "Inning end";
      }
    } else {
      return "0.0";
    }
  }

  updateBowlerScore() {
    const bowlerNames: string[] = [];
    let over = Number(
      this.calOverCount().substring(0, this.calOverCount().indexOf("."))
    );
    if (this.tossLosserTeam.teamplayer) {
      this.tossLosserTeam.teamplayer.forEach(element => {
        if (element.toLowerCase() === "bowler") {
          bowlerNames.push(element.firstName);
        }
      });
    }
    for (over = 0; over < this.overNumber; over++) {
      this.teamBowlerScore.teamName = this.tossLosserTeam.teamName;
      if (over % 2 === 0) {
        this.teamBowlerScore.playerScore.name = bowlerNames[0];
      } else {
        this.teamBowlerScore.playerScore.name = bowlerNames[1];
      }
    }
  }
  ballCount() {
    if (this.ballPerOver < 6) {
      if (
        this.teamBowlerScore.playerScore.run &&
        this.teamBowlerScore.playerScore.over
      ) {
        this.teamBowlerScore.playerScore.economyRate = this.calEconomyRate(
          this.teamBowlerScore.playerScore.run,
          this.teamBowlerScore.playerScore.over
        );
      }
      this.store.dispatch(new AddBowlerScorecard(this.teamBowlerScore));
      this.teamBowlerScore.playerScore.run = 0;
      this.teamBowlerScore.playerScore.over = 0;
      this.teamBowlerScore.playerScore.wicket = 0;
      this.teamBowlerScore.playerScore.economyRate = "";
    } else {
      this.ballPerOver = 1;
      this.updateBowlerScore();
    }
  }
  calStrikeRate(run: number, ball: number): string {
    if (((run / ball) * 100).toFixed()) {
      return ((run / ball) * 100).toFixed();
    }
    return "0";
  }

  calEconomyRate(run: number, ball: number): string {
    return ((run / ball) * 6).toFixed(1);
  }

  addTeamDetails(teamName: string) {
    this.teamDetails = this.store.selectSnapshot(TeamState.getTeamList);
    this.teamWonToss = teamName;
    this.questionUpdateService.setDatabaseName("teamA");
  }
}
