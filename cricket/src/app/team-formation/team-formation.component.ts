import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ScoreCardService } from "../services/score-card.service";
import { AddTeam } from "../+state/teamformation/teamformation.actions";
import { Store } from "@ngxs/store";
import { TeamformationService } from "../services/teamformation/teamformation.service";
import { TeamPlayerModel } from "../services/models/teamplayer.model";
import { TeamState } from "../+state/teamformation/teamformation.state";

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
  teamAAddFlag = true;
  teamBAddFlag = true;

  count = 0;
  teamAPlayerCount = 1;
  teamBPlayerCount = 1;
  constructor(
    private fb: FormBuilder,
    private scoreCardService: ScoreCardService,
    private store: Store,
    private teamformationService: TeamformationService,
    private route: ActivatedRoute,
    private router: Router
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
        firstName: this.addPlayerForm.controls.firstName.value,
        lastName: this.addPlayerForm.controls.lastName.value,
        role: this.addPlayerForm.controls.role.value
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
        firstName: this.addPlayerForm.controls.firstName.value,
        lastName: this.addPlayerForm.controls.lastName.value,
        role: this.addPlayerForm.controls.role.value
      };
      this.playersTeamB.push(this.playerProp);
      this.playerCountChecking(this.playersTeamB);
      this.teamBPlayerCount++;
    }
    this.addPlayerForm.controls.firstName.setValue("");
    this.addPlayerForm.controls.lastName.setValue("");
    this.addPlayerForm.controls.role.setValue("");
    this.teamName.setValue("");
    if (this.count >= 2 && this.playersTeamA.length > 5 && this.teamAAddFlag) {
      this.addTeamDetails(this.playersTeamA, this.teamAName);
    }
    if (this.count >= 2 && this.playersTeamB.length > 5 && this.teamBAddFlag) {
      this.addTeamDetails(this.playersTeamB, this.teamBName);
    }
  }
  cancelPlayer(): void {
    this.addPlayerForm.controls.firstName.setValue("");
    this.addPlayerForm.controls.lastName.setValue("");
    this.addPlayerForm.controls.role.setValue("");
    this.teamName.setValue("");
  }

  playerCountChecking(playerList: any): any {
    let batsmanCount = 0;
    let bowlerCount = 0;
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
  arrayRemove(arr: any, value: string): any {
    return arr.filter((ele: any) => {
      return ele !== value;
    });
  }

  addTeamDetails(playerList: TeamPlayerModel[], teamname: string) {
    const teamDetails = {
      teamName: teamname,
      teamplayer: playerList
    };
    this.store.dispatch(new AddTeam(teamDetails));
    // const teamDetailsResponse = this.store.selectSnapshot(
    //   TeamState.getTeamList
    // );
    const teamDetailsResponse = this.teamformationService.fetchTeams();
    teamDetailsResponse.subscribe(teamDetailsResp => {
      teamDetailsResp.forEach(element => {
        if (element.teamName === this.teamAName && this.teamAAddFlag) {
          this.teamAAddFlag = false;
        }
        if (element.teamName === this.teamBName && this.teamBAddFlag) {
          this.teamBAddFlag = false;
        }
      });
    });
  }
  navigateToScoreboard(teamName: string) {
    this.router.navigate(["../scoreboard", { team: teamName }], {
      relativeTo: this.route
    });
  }
}
