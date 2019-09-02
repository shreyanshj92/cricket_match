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
import { AppSettings } from "../Static/constants/appsetting";

@Component({
  selector: "app-team-formation",
  templateUrl: "./team-formation.component.html",
  styleUrls: ["./team-formation.component.scss"]
})
export class TeamFormationComponent implements OnInit {
  addTeamNameForm: FormGroup;
  // teamName = new FormControl("");
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
  bowlerCount: number;
  batsmanCount: number;
  playerCount: number;

  teamAName: string;
  teamBName: string;
  selectedTeamName: string;
  teamAAddFlag = true;
  teamBAddFlag = true;
  submitted: boolean;
  isDisplayPlayerDropdown: boolean;

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
    this.addTeamNameForm = this.fb.group({
      teamName: this.fb.control("", [Validators.required])
    });
    this.addPlayerForm = this.fb.group({
      firstName: this.fb.control("", [Validators.required]),
      lastName: this.fb.control("", [Validators.required]),
      role: this.fb.control("", [Validators.required]),
      selectedTeam: this.fb.control("", [Validators.required])
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.addTeamNameForm.invalid) {
      return;
    }
    this.addTeamName();
  }
  addPlayerFormSubmit() {
    if (this.addPlayerForm.invalid) {
      return;
    }
  }

  updatePlayerCount(event: any) {
    this.playerCount = Number(event.target.value);
    if (this.playerCount === 6) {
      this.bowlerCount = AppSettings.BOWLERCOUNTFORSIX;
      this.batsmanCount = AppSettings.BATSMANCOUNTFORSIX;
    } else {
      this.bowlerCount = AppSettings.BOWLERCOUNTFORELEVEN;
      this.batsmanCount = AppSettings.BATSMANCOUNTFORELEVEN;
    }
    this.isDisplayPlayerDropdown = true;
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
  addTeamName(): void {
    if (this.count === 0) {
      this.teamAName = this.addTeamNameForm.controls.teamName.value.toUpperCase();
      this.count++;
    } else if (this.count === 1) {
      this.teamBName = this.addTeamNameForm.controls.teamName.value.toUpperCase();
      this.count++;
    } else {
      return;
    }
    this.addTeamNameForm.controls.teamName.setValue("");
  }
  addPlayer(): void {
    if (
      this.addPlayerForm.value.selectedTeam === "teamA" &&
      this.playersTeamA.length < this.playerCount
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
      this.playersTeamB.length < this.playerCount
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
    this.addPlayerForm.controls.selectedTeam.setValue("");
    if (
      this.count >= 2 &&
      this.playersTeamA.length > this.playerCount - 1 &&
      this.teamAAddFlag
    ) {
      this.addTeamDetails(this.playersTeamA, this.teamAName);
    }
    if (
      this.count >= 2 &&
      this.playersTeamB.length > this.playerCount - 1 &&
      this.teamBAddFlag
    ) {
      this.addTeamDetails(this.playersTeamB, this.teamBName);
    }
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
      if (player.role === "Batsman" && batsmanCount === this.batsmanCount) {
        if (this.selectedTeamName === "teamA") {
          this.roles = this.arrayRemove(this.teamARoles, player.role);
          this.teamARoles = this.roles;
        } else if (this.selectedTeamName === "teamB") {
          this.roles = this.arrayRemove(this.teamBRoles, player.role);
          this.teamBRoles = this.roles;
        }
      }
      if (player.role === "Bowler" && bowlerCount === this.bowlerCount) {
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
      teamSize: this.playerCount,
      teamplayer: playerList
    };
    console.log("teamDetails", teamDetails);
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
