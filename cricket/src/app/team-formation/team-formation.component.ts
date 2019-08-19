import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ScoreCardService } from "../services/score-card.service";

@Component({
  selector: "app-team-formation",
  templateUrl: "./team-formation.component.html",
  styleUrls: ["./team-formation.component.scss"]
})
export class TeamFormationComponent implements OnInit {
  teamName = new FormControl("");
  addPlayerForm: FormGroup;
  playersTeamA = [];
  playersTeamB = [];
  roles = [];
  teamARoles = ["Captain", "Batsman", "Bowler", "AllRounder"];
  teamBRoles = ["Captain", "Batsman", "Bowler", "AllRounder"];
  playerProp = {
    id: 0,
    firstName: "",
    lastName: "",
    role: ""
  };

  teamAName: string;
  teamBName: string;
  selectedTeamName: string;

  count = 0;
  teamAPlayerCount = 1;
  teamBPlayerCount = 1;
  constructor(
    private fb: FormBuilder,
    private scoreCardService: ScoreCardService
  ) {}

  ngOnInit(): void {
    this.addPlayerForm = this.fb.group({
      firstName: this.fb.control("", [Validators.required]),
      lastName: this.fb.control("", [Validators.required]),
      role: this.fb.control("", [Validators.required]),
      selectedTeam: this.fb.control("", [Validators.required])
    });
  }

  updateTeamName(event: any): void {
    this.selectedTeamName = event.target.value;
    if (this.selectedTeamName === "teamA") {
      this.roles = this.teamARoles;
    }
    if (this.selectedTeamName === "teamB") {
      this.roles = this.teamBRoles;
    }
  }
  addTeamName(value: string): void {
    if (this.count === 0) {
      this.teamAName = value.toUpperCase();
      this.count++;
    } else if (this.count === 1) {
      this.teamBName = value.toUpperCase();
      this.count++;
    } else {
      return;
    }
    this.teamName.setValue("");
  }
  addPlayer(): void {
    if (
      this.addPlayerForm.value.selectedTeam === "teamA" &&
      this.playersTeamA.length < 6
    ) {
      this.playerProp = {
        id: this.teamAPlayerCount,
        firstName: this.addPlayerForm.controls["firstName"].value,
        lastName: this.addPlayerForm.controls["lastName"].value,
        role: this.addPlayerForm.controls["role"].value
      };
      this.playersTeamA.push(this.playerProp);
      this.playerCountChecking(this.playersTeamA);
      this.teamAPlayerCount++;
    } else if (
      this.addPlayerForm.value.selectedTeam === "teamB" &&
      this.playersTeamB.length < 6
    ) {
      this.playerProp = {
        id: this.teamBPlayerCount,
        firstName: this.addPlayerForm.controls["firstName"].value,
        lastName: this.addPlayerForm.controls["lastName"].value,
        role: this.addPlayerForm.controls["role"].value
      };
      this.playersTeamB.push(this.playerProp);
      this.playerCountChecking(this.playersTeamB);
      this.teamBPlayerCount++;
    }
    this.addPlayerForm.controls["firstName"].setValue("");
    this.addPlayerForm.controls["lastName"].setValue("");
    this.addPlayerForm.controls["role"].setValue("");
    this.teamName.setValue("");
  }
  editPlayer(): void {}
  cancelPlayer(): void {
    this.addPlayerForm.controls["firstName"].setValue("");
    this.addPlayerForm.controls["lastName"].setValue("");
    this.addPlayerForm.controls["role"].setValue("");
    this.teamName.setValue("");
  }

  playerCountChecking(playerList: any): any {
    let batsmanCount = 0,
      bowlerCount = 0;
    playerList.forEach(player => {
      if (player.role === "Batsman") {
        batsmanCount++;
      } else if (player.role === "Bowler") {
        bowlerCount++;
      }
    });
    playerList.forEach(player => {
      if (player.role === "Batsman" && batsmanCount === 2) {
        if (this.selectedTeamName === "teamA") {
          this.roles = this.arrayRemove(this.teamARoles, player.role);
          this.teamARoles = this.roles;
        } else if (this.selectedTeamName === "teamB") {
          this.roles = this.arrayRemove(this.teamBRoles, player.role);
          this.teamBRoles = this.roles;
        }
      }
      if (player.role === "Bowler" && bowlerCount === 2) {
        if (this.selectedTeamName === "teamA") {
          this.roles = this.arrayRemove(this.teamARoles, player.role);
          this.teamARoles = this.roles;
        } else if (this.selectedTeamName === "teamB") {
          this.roles = this.arrayRemove(this.teamBRoles, player.role);
          this.teamBRoles = this.roles;
        }
      }
      if (player.role === "Captain") {
        if (this.selectedTeamName === "teamA") {
          this.roles = this.arrayRemove(this.teamARoles, player.role);
          this.teamARoles = this.roles;
        } else if (this.selectedTeamName === "teamB") {
          this.roles = this.arrayRemove(this.teamBRoles, player.role);
          this.teamBRoles = this.roles;
        }
      }
      if (player.role === "AllRounder") {
        if (this.selectedTeamName === "teamA") {
          this.roles = this.arrayRemove(this.teamARoles, player.role);
          this.teamARoles = this.roles;
        } else if (this.selectedTeamName === "teamB") {
          this.roles = this.arrayRemove(this.teamBRoles, player.role);
          this.teamBRoles = this.roles;
        }
      }
    });
  }
  arrayRemove(arr, value): any {
    return arr.filter(function(ele) {
      return ele != value;
    });
  }

  addTeamDetails() {
    const teamDetails = {
      teamA: {
        name: this.teamAName,
        playerList: this.playersTeamA
      },
      teamB: {
        name: this.teamBName,
        playerList: this.playersTeamA
      }
    };
    this.scoreCardService.setTeamDetail(teamDetails);
  }
}
