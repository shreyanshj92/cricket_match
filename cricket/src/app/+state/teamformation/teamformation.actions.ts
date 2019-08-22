import { TeamFormationModel } from "src/app/services/models/teamformation.model";
export class AddTeam {
  static readonly type = "[TEAM] Add";

  constructor(public payload: TeamFormationModel) {}
}

export class GetTeams {
  static readonly type = "[TEAM] Get";
}

export class SetSelectedTeam {
  static readonly type = "[TEAM] Set";

  constructor(public payload: TeamFormationModel) {}
}
