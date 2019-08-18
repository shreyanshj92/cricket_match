import { Component, OnInit } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";

@Component({
  selector: "app-scoreboard",
  templateUrl: "./scoreboard.component.html",
  styleUrls: ["./scoreboard.component.scss"]
})
export class ScoreboardComponent implements OnInit {
  freeHitballFlag: boolean;
  scoreCard: any;
  teamDetail: any;
  constructor(private scoreCardService: ScoreCardService) {}

  ngOnInit() {
    this.scoreCard = this.scoreCardService.getScore();
    this.getTeamDetails();
  }
  calRunRate(): string {
    return this.scoreCardService.calRunRate();
  }
  calOverCount(): string {
    return this.scoreCardService.calOverCount();
  }
  getTeamDetails() {
    this.teamDetail = this.scoreCardService.getTeamDetail();
  }
}
