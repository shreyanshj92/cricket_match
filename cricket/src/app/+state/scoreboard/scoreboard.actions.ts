import { TeamPlayerScoreModel } from "src/app/services/models/teamplayercore.model";

export class AddScorecard {
  static readonly type = "[PLAPER SCORE] Add";

  constructor(public payload: TeamPlayerScoreModel) {}
}

export class GetScorecards {
  static readonly type = "[PLAPER SCORE] Get";
}

export class SetSelectedScorecard {
  static readonly type = "[PLAPER SCORE] Set";

  constructor(public payload: TeamPlayerScoreModel) {}
}

export class AddScorecardPlayerScore {
  static readonly type = "[PLAPER SCORE] Add";

  constructor(public payload: TeamPlayerScoreModel) {}
}
