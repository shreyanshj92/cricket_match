import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { TeamPlayerScoreModel } from "./models/teamplayercore.model";
import { AddScorecard } from "../+state/scoreboard/scoreboard.actions";
import { Store } from "@ngxs/store";
import { TeamState } from "../+state/teamformation/teamformation.state";

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
  teamDetails: any;
  teamWonToss: string;
  tossWinnerTeam: any;

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

  constructor(private http: HttpClient, private store: Store) {}
  fetchScorecard() {
    return this.http.get<TeamPlayerScoreModel[]>(
      "http://localhost:3000/teamPlayerScore"
    );
  }
  addScorecard(payload: TeamPlayerScoreModel) {
    return this.http.post<TeamPlayerScoreModel>(
      "http://localhost:3000/teamPlayerScore",
      payload
    );
  }

  getScore(): any {
    this.findTossWinnerTeam();
    return this.scoreCardObj;
  }
  getPlayerScore() {
    return this.teamPlayerScore;
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
      }

      if (questionObj.offeredRun) {
        this.scoreCardObj.totalRun =
          this.scoreCardObj.totalRun + questionObj.offeredRun;
        if (
          questionObj.answer.toLowerCase() === "wide ball" ||
          questionObj.answer.toLowerCase() === "no ball"
        ) {
          return;
        } else {
          this.teamPlayerScore.playerScore.run =
            this.teamPlayerScore.playerScore.run + questionObj.offeredRun;
        }

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
        if (
          this.teamPlayerScore.playerScore.run &&
          this.teamPlayerScore.playerScore.ball
        ) {
          this.teamPlayerScore.playerScore.strikeRate = this.calStrikeRate(
            this.teamPlayerScore.playerScore.run,
            this.teamPlayerScore.playerScore.ball
          );
        }
        this.store.dispatch(new AddScorecard(this.teamPlayerScore));
        this.teamPlayerScore.playerScore.run = 0;
        this.teamPlayerScore.playerScore.ball = 0;
        this.teamPlayerScore.playerScore.four = 0;
        this.teamPlayerScore.playerScore.six = 0;
        this.teamPlayerScore.playerScore.strikeRate = "";
      }
    }
  }

  findTossWinnerTeam() {
    this.teamPlayerScore.teamName = this.teamWonToss;
    this.teamDetails.forEach(team => {
      if (team.teamName === this.teamWonToss) {
        this.tossWinnerTeam = team;
      }
    });
    if (this.tossWinnerTeam) {
      this.teamPlayerScore.playerScore.name = this.tossWinnerTeam.teamplayer[
        this.scoreCardObj.totalWicket
      ].firstName;
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
    return ((run / ball) * 100).toFixed();
  }

  addTeamDetails(teamName: string) {
    this.teamDetails = this.store.selectSnapshot(TeamState.getTeamList);
    // this.teamDetails = this.teamformationService.fetchTeams();
    this.teamWonToss = teamName;
  }
}
