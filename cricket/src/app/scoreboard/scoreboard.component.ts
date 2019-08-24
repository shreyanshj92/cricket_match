import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";
import { Store } from "@ngxs/store";
import { ScoreCardState } from "../+state/scoreboard/scoreboard.state";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreboardComponent implements OnInit {
  freeHitballFlag: boolean;
  scoreCard: any;
  displayBatsman: any;
  displayBowler: string;
  firstInningScore: string;
  teamWonToss: any;
  tossWinnerTeam: any;
  teamScoreBoardObj: any;
  runRate: string;
  constructor(
    private scoreCardService: ScoreCardService,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if ("team" in params) {
        this.teamWonToss = params.team;
        this.scoreCardService.addTeamDetails(this.teamWonToss);
      }
    });
    this.scoreCard = this.scoreCardService.getScore();
    const playerDetails = this.scoreCardService.getPlayerScore();
    if (playerDetails) {
      this.displayBatsman =
        playerDetails.playerScore[this.scoreCard.totalWicket];
    }
    this.scoreCard = this.scoreCardService.getScore();
    console.log("displayBatsman", this.displayBatsman);
    this.calRunRate();

    // this.teamScoreBoardObj = this.store.selectSnapshot(
    //   ScoreCardState.getScorecardList
    // );
    // console.log("teamScoreBoardObj", this.teamScoreBoardObj);
    // if (this.teamScoreBoardObj.length > 0) {
    //   this.displayBatsman = this.teamScoreBoardObj[
    //     this.scoreCard.totalWicket
    //   ].playerScore;
    // }
    if (this.scoreCard.totalWicket === 6) {
      this.firstInningScore = this.scoreCard.totalRun;
    } else if (this.calOverCount()) {
      this.firstInningScore = `${this.scoreCard.totalRun}/${
        this.scoreCard.totalWicket
      }`;
    }
  }

  calRunRate(): void {
    this.runRate = (
      (this.scoreCard.totalRun * 6) /
      this.scoreCard.totalBall
    ).toFixed(1);
  }

  calOverCount(): string {
    const overCount = this.scoreCardService.calOverCount();
    if (overCount.toLowerCase() !== "inning end") {
      return overCount;
    } else {
      return "6.0";
    }
  }
}
