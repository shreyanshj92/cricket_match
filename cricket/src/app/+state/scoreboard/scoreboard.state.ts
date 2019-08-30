import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { ScoreCardService } from "src/app/services/score-card.service";
import {
  SetSelectedScorecard,
  AddScorecard,
  GetScorecards
} from "./scoreboard.actions";
import { TeamPlayerScoreModel } from "src/app/services/models/teamplayercore.model";

export class ScoreCardStateModel {
  scorecards: TeamPlayerScoreModel[];
  selectedScorecard: TeamPlayerScoreModel;
}

@State<ScoreCardStateModel>({
  name: "scorecards",
  defaults: {
    scorecards: [],
    selectedScorecard: null
  }
})
export class ScoreCardState {
  constructor(private scoreCardService: ScoreCardService) {}

  @Selector()
  static getScorecardList(state: ScoreCardStateModel) {
    return state.scorecards;
  }

  @Selector()
  static getSelectedScorecard(state: ScoreCardStateModel) {
    return state.selectedScorecard;
  }

  @Action(GetScorecards)
  getScorecards({ getState, setState }: StateContext<ScoreCardStateModel>) {
    return this.scoreCardService.fetchScorecard().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          scorecards: result
        });
      })
    );
  }

  @Action(AddScorecard)
  addScorecard(
    { getState, patchState }: StateContext<ScoreCardStateModel>,
    { payload }: AddScorecard
  ) {
    return this.scoreCardService.addScorecard(payload).pipe(
      tap(result => {
        console.log("result", result);
        const state = getState();
        patchState({
          scorecards: [...state.scorecards, result]
        });
      })
    );
  }

  @Action(SetSelectedScorecard)
  setSelectedScorecardId(
    { getState, setState }: StateContext<ScoreCardStateModel>,
    { payload }: SetSelectedScorecard
  ) {
    const state = getState();
    console.log(state);
    setState({
      ...state,
      selectedScorecard: payload
    });
  }
}
