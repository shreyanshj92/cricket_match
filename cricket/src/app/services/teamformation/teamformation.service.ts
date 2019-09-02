import { TeamScoreModel } from "./../models/teamScore.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TeamFormationModel } from "../models/teamformation.model";

@Injectable({
  providedIn: "root"
})
export class TeamformationService {
  dummyTeamTable = "teamDetails";
  constructor(private http: HttpClient) {}
  fetchTeams() {
    return this.http.get<TeamFormationModel[]>(
      `http://localhost:3000/teamDetails`
    );
  }

  addTeam(payload: TeamFormationModel) {
    return this.http.post<TeamFormationModel>(
      `http://localhost:3000/teamDetails`,
      payload
    );
  }

  fetchTeamScore() {
    return this.http.get<TeamScoreModel[]>(`http://localhost:3000/teamScore`);
  }

  addTeamScore(payload: TeamScoreModel) {
    return this.http.post<TeamScoreModel>(
      `http://localhost:3000/teamScore`,
      payload
    );
  }
}
