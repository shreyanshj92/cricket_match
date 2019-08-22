import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TeamPlayerScoreModel } from "../models/teamplayercore.model";

@Injectable({
  providedIn: "root"
})
export class ScoreboardService {
  constructor(private http: HttpClient) {}
  fetchTeamPlayerScore() {
    return this.http.get<TeamPlayerScoreModel[]>(
      `http://localhost:3000/teamPlayerScore`
    );
  }

  addTeamPlayerScore(payload: TeamPlayerScoreModel) {
    return this.http.post<TeamPlayerScoreModel>(
      `http://localhost:3000/teamPlayerScore`,
      payload
    );
  }
  updateQuestion(payload: TeamPlayerScoreModel, teamName: number) {
    return this.http.put<TeamPlayerScoreModel>(
      `http://localhost:3000/teamPlayerScore/${teamName}`,
      payload
    );
  }
}
