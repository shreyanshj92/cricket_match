import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ScoreCardState } from "../+state/scoreboard/scoreboard.state";
import { BatsmanScoreModel } from "../services/models/batsmanscore.model";
import { ScoreCardService } from "../services/score-card.service";

@Component({
  selector: "app-scorecart",
  templateUrl: "./scorecart.component.html",
  styleUrls: ["./scorecart.component.scss"]
})
export class ScorecartComponent implements OnInit {
  @Select(ScoreCardState.getScorecardList) playerScore: Observable<
    BatsmanScoreModel[]
  >;
  constructor(private scoreCardService: ScoreCardService) {}

  ngOnInit() {
    this.scoreCardService.fetchScorecard().subscribe(score => {
      console.log("score", score, this.playerScore);
    });
  }
}
