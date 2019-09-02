import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TeamPlayerScoreBatsmanModel } from "../models/teamplayercore.model";

@Injectable({
  providedIn: "root"
})
export class ScoreboardService {
  constructor(private http: HttpClient) {}
  fetchTeamPlayerScore() {
    return this.http.get<TeamPlayerScoreBatsmanModel[]>(
      `http://localhost:3000/teamPlayerScore`
    );
  }

  addTeamPlayerScore(payload: TeamPlayerScoreBatsmanModel) {
    return this.http.post<TeamPlayerScoreBatsmanModel>(
      `http://localhost:3000/teamPlayerScore`,
      payload
    );
  }
  updateQuestion(payload: TeamPlayerScoreBatsmanModel, teamName: number) {
    return this.http.put<TeamPlayerScoreBatsmanModel>(
      `http://localhost:3000/teamPlayerScore/${teamName}`,
      payload
    );
  }
}
