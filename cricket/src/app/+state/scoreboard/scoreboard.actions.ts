import {
  TeamPlayerScoreBatsmanModel,
  TeamPlayerScoreBowlerModel
} from "src/app/services/models/teamplayercore.model";

export class AddScorecard {
  static readonly type = "[PLAPER SCORE] Add";

  constructor(public payload: TeamPlayerScoreBatsmanModel) {}
}

export class AddBowlerScorecard {
  static readonly type = "[PLAPER SCORE] Add bowler";

  constructor(public payload: TeamPlayerScoreBowlerModel) {}
}

export class GetScorecards {
  static readonly type = "[PLAPER SCORE] Get";
}

export class SetSelectedScorecard {
  static readonly type = "[PLAPER SCORE] Set";

  constructor(public payload: TeamPlayerScoreBatsmanModel) {}
}

export class AddScorecardPlayerScore {
  static readonly type = "[PLAPER SCORE] Add";

  constructor(public payload: TeamPlayerScoreBatsmanModel) {}
}
