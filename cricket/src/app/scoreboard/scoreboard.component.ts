import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";
import { Store, Select } from "@ngxs/store";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";
import { ScorecartComponent } from "../scorecart/scorecart.component";
import { TeamState } from "../+state/teamformation/teamformation.state";

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
  playerDetails: any;
  teamDetails: any;
  teamSize: number;
  playerDetail = [];
  teams = [];

  constructor(
    private scoreCardService: ScoreCardService,
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if ("team" in params) {
        this.teamWonToss = params.team;
        this.scoreCardService.addTeamDetails(this.teamWonToss);
      }
    });
    this.scoreCard = this.scoreCardService.getScore();
    this.playerDetails = this.scoreCardService.getPlayerScore();
    this.teamDetails = this.store.selectSnapshot(TeamState.getTeamList);
    this.teamDetails.forEach(element => {
      this.teams.push(element.teamName);
      this.teamSize = element.teamSize;
    });
    this.teams = [...new Set(this.teams)];

    if (this.scoreCard.totalWicket === 6) {
      this.firstInningScore = this.scoreCard.totalRun;
    } else if (this.calOverCount()) {
      this.firstInningScore = `${this.scoreCard.totalRun}/${this.scoreCard.totalWicket}`;
    }
    this.playerDetail.push(this.playerDetails);
  }

  getPlayerScore(): string {
    return (
      this.playerDetails.playerScore.name +
      `: ${this.playerDetails.playerScore.run}(${this.playerDetails.playerScore.ball})`
    );
  }

  getFirstIningsFinalScore() {
    this.scoreCardService.getFirstIningsScore();
  }

  calRunRate(): string {
    return ((this.scoreCard.totalRun * 6) / this.scoreCard.totalBall).toFixed(
      1
    );
  }

  calOverCount(): string {
    const overCount = this.scoreCardService.calOverCount().toLowerCase();
    if (overCount !== "inning end") {
      return overCount;
    } else {
      // this.firstInnigscore(overCount);
      return;
    }
  }

  firstInnigscore(overCount) {
    Swal.fire({
      title: "Team score",
      text: `${this.scoreCard.run}/${this.scoreCard.wicket}
      Over: ${overCount}`,
      showCloseButton: true,
      showConfirmButton: false
    }).then(() => {
      console.log("Change inning");
    });
  }

  displayScoreboard() {
    Swal.fire({
      title: "Scoreboard",
      width: 800,
      showCloseButton: true,
      showConfirmButton: false
    });
  }

  openDialog(): void {
    this.dialog.open(ScorecartComponent, {
      width: "667px",
      data: { playerDetails: this.playerDetail }
    });
  }
}
