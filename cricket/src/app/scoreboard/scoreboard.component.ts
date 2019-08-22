import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";
import { TeamFormationModel } from "../services/models/teamformation.model";
import { TeamState } from "../+state/teamformation/teamformation.state";
import { Store } from "@ngxs/store";
import { ScoreboardService } from "../services/scoreboard/scoreboard.service";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreboardComponent implements OnInit {
  freeHitballFlag: boolean;
  scoreCard: any;
  displayBatsman: string;
  displayBowler: string;
  firstInningScore: string;
  teamWonToss: any;
  tossWinnerTeam: any;
  teamDetails: TeamFormationModel[];
  constructor(
    private scoreCardService: ScoreCardService,
    private store: Store,
    private route: ActivatedRoute,
    private scoreboardService: ScoreboardService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if ("team" in params) {
        this.teamWonToss = params.team;
      }
    });
    this.teamDetails = this.store.selectSnapshot(TeamState.getTeamList);
    this.getTosswinnerTeamDetails();
    this.scoreCard = this.scoreCardService.getScore();
    if (this.scoreCard.totalWicket === 6) {
      this.firstInningScore = this.scoreCard.totalRun;
    } else if (this.calOverCount()) {
      this.firstInningScore = `${this.scoreCard.totalRun}/${
        this.scoreCard.totalWicket
      }`;
    }
  }

  getTosswinnerTeamDetails(): void {
    this.teamDetails.forEach((teamDetail: any) => {
      if (this.teamWonToss === teamDetail.teamName) {
        this.tossWinnerTeam = teamDetail;
      }
    });
  }

  calRunRate(): string {
    return this.scoreCardService.calRunRate();
  }

  calOverCount(): string {
    const overCount = this.scoreCardService.calOverCount();
    if (overCount.toLowerCase() !== "inning end") {
      return overCount;
    } else {
      return "6.0";
    }
  }
  playerScore(): string {
    if (this.scoreCard.totalWicket < 6) {
      switch (this.scoreCard.totalWicket) {
        case 0:
          // this.scoreboardService.addTeamPlayerScore();
          return (
            this.tossWinnerTeam.playerList[this.scoreCard.totalWicket] + ":"
          );

        case 1:
          return (
            this.tossWinnerTeam.playerList[this.scoreCard.totalWicket] + ":"
          );

        case 2:
          return (
            this.tossWinnerTeam.playerList[this.scoreCard.totalWicket] + ":"
          );

        case 3:
          return (
            this.tossWinnerTeam.playerList[this.scoreCard.totalWicket] + ":"
          );

        case 4:
          return (
            this.tossWinnerTeam.playerList[this.scoreCard.totalWicket] + ":"
          );

        case 5:
          return (
            this.tossWinnerTeam.playerList[this.scoreCard.totalWicket] + ":"
          );

        default:
          break;
      }
    }
  }
}
