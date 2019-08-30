import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";
import { Store, Select } from "@ngxs/store";
import { ScoreCardState } from "../+state/scoreboard/scoreboard.state";
import { Observable } from "rxjs";
import { BatsmanScoreModel } from "../services/models/batsmanscore.model";
import Swal from "sweetalert2";

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
    this.playerDetails = this.scoreCardService.getPlayerScore();

    if (this.scoreCard.totalWicket === 6) {
      this.firstInningScore = this.scoreCard.totalRun;
    } else if (this.calOverCount()) {
      this.firstInningScore = `${this.scoreCard.totalRun}/${this.scoreCard.totalWicket}`;
    }
  }

  getPlayerScore(): string {
    console.log("this.playerDetails", this.playerDetails);
    // if (this.playerDetails.teamName === this.teamWonToss) {

    // }
    return (
      this.playerDetails.playerScore.name +
      `: ${this.playerDetails.playerScore.run}(${this.playerDetails.playerScore.ball})`
    );
  }

  calRunRate(): string {
    return ((this.scoreCard.totalRun * 6) / this.scoreCard.totalBall).toFixed(
      1
    );
  }

  calOverCount(): string {
    const overCount = this.scoreCardService.calOverCount();
    if (overCount.toLowerCase() !== "inning end") {
      return overCount;
    } else {
      return "6.0";
    }
  }

  displayScoreboard() {
    Swal.fire({
      title: "Scoreboard",
      html: `<div class="container">
  <div>
    <table class="table table-bordered">
      <thead>
        <th scope="col">Player</th>
        <th scope="col">Run</th>
        <th scope="col">Ball</th>
        <th scope="col">Six run</th>
        <th scope="col">Four</th>
        <th scope="col">SR</th>
      </thead>
      <tbody>
        <tr *ngFor="let player of playerDetails">
          <td>{{2+2}}{{ player.name }}</td>
          <td>{{ player.run }}</td>
          <td>{{ player.ball }}</td>
          <td>{{ player.six }}</td>
          <td>{{ player.four }}</td>
          <td>{{ player.strikeRate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `,

      width: 800,
      showCloseButton: true,
      showConfirmButton: false
    });
  }
}
