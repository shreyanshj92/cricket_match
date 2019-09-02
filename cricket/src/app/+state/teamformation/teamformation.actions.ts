import { TeamFormationModel } from "src/app/services/models/teamformation.model";
import { TeamScoreModel } from "src/app/services/models/teamScore.model";
export class AddTeam {
  static readonly type = "[TEAM] Add";

  constructor(
    public payload: TeamFormationModel,
    public teamScore: TeamScoreModel
  ) {}
}

export class AddTeamScore {
  static readonly type = "[TEAMSCORE] Add";

  constructor(public teamScore: TeamScoreModel) {}
}

export class GetTeams {
  static readonly type = "[TEAM] Get";
}

export class GetTeamScore {
  static readonly type = "[TEAMSCORE] Get";
}

export class SetSelectedTeam {
  static readonly type = "[TEAM] Set";

  constructor(public payload: TeamFormationModel) {}
}
