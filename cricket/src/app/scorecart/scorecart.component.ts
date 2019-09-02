import { TeamPlayerScoreBatsmanModel } from "./../services/models/teamplayercore.model";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ScoreCardService } from "../services/score-card.service";

@Component({
  selector: "app-scorecart",
  templateUrl: "./scorecart.component.html",
  styleUrls: ["./scorecart.component.scss"]
})
export class ScorecartComponent implements OnInit {
  data = [];
  teams = [];
  constructor(
    public dialogRef: MatDialogRef<ScorecartComponent>,
    private scoreCardService: ScoreCardService // @Inject(MAT_DIALOG_DATA) public data: TeamPlayerScoreBatsmanModel
  ) {}

  ngOnInit() {
    this.scoreCardService.fetchScorecard().subscribe(player => {
      this.data = player;
      this.data.forEach(teamScore => {
        this.teams.push(teamScore.teamName);
      });
      this.teams = [...new Set(this.teams)];
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
