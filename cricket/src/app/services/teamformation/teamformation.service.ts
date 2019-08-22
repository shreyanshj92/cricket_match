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
}
