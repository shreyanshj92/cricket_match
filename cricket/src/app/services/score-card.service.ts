import { ActivatedRoute } from "@angular/router";
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
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ScoreCardService {
  scoreCardObj = {
    showScoreTeamName: "",
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
  teamAFinalScore: any;

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
    private teamformationService: TeamformationService,
    private router: Router,
    private route: ActivatedRoute
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

    if (this.scoreCardObj.totalWicket > this.teamSize - 1) {
      this.updateInnings();
    }
    // this.ballCount();
  }

  updateInnings() {
    let overCount: any;
    if (this.scoreCardObj.totalBall === 36) {
      overCount = 6;
    }
    if (
      this.scoreCardObj.totalWicket === 6 ||
      Math.floor(this.scoreCardObj.totalBall / 6) === 6
    ) {
      this.teamAFinalScore = `${this.scoreCardObj.showScoreTeamName}: ${this.scoreCardObj.totalRun}/${this.scoreCardObj.totalWicket}  Overs: ${overCount}`;
    }
    this.router.navigate(["../teamformation"], {
      relativeTo: this.route
    });

    this.scoreCardObj.showScoreTeamName = this.tossLosserTeam;
    this.scoreCardObj.totalRun = 0;
    this.scoreCardObj.totalBall = 0;
    this.scoreCardObj.totalWicket = 0;
    this.scoreCardObj.extraRun = 0;
    this.scoreCardObj.totalFours = 0;
    this.scoreCardObj.totalSixes = 0;

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
    // this.questionUpdateService.setDatabaseName("teamB");
  }

  updateBatsmanScore() {
    this.teamDetails.forEach(team => {
      this.teamSize = team.teamSize;

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
        team.teamName === this.tossLosserTeam &&
        this.scoreCardObj.totalWicket < this.teamSize &&
        this.innigsChangeFlag
      ) {
        this.teamBatsmanScore.teamName = team.teamName;
        return (this.teamBatsmanScore.playerScore.name =
          team.teamplayer[this.scoreCardObj.totalWicket].firstName);
      }
    });
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
        return;
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
    this.tossWinnerTeam = teamName;
    this.teamDetails = this.store.selectSnapshot(TeamState.getTeamList);
    this.teamDetails.forEach(element => {
      this.teams.push(element.teamName);
    });

    this.teams = [...new Set(this.teams)];
    this.teams.forEach(team => {
      if (this.tossWinnerTeam === team) {
        this.teamWonToss = team;
      } else {
        this.tossLosserTeam = team;
      }
    });
    this.scoreCardObj.showScoreTeamName = this.teamWonToss;
    // this.questionUpdateService.setDatabaseName("teamA");
  }

  getScore(): any {
    return this.scoreCardObj;
  }
  getFirstIningsScore(): string {
    return this.teamAFinalScore;
  }
}
