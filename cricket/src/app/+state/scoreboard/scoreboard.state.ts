import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { ScoreCardService } from "src/app/services/score-card.service";
import {
  SetSelectedScorecard,
  AddScorecard,
  GetScorecards,
  AddBowlerScorecard
} from "./scoreboard.actions";
import {
  TeamPlayerScoreBatsmanModel,
  TeamPlayerScoreBowlerModel
} from "src/app/services/models/teamplayercore.model";

export class ScoreCardStateModel {
  batsmanScorecards: TeamPlayerScoreBatsmanModel[];
  bowlerScorecards: TeamPlayerScoreBowlerModel[];
  selectedScorecard: TeamPlayerScoreBatsmanModel;
}

@State<ScoreCardStateModel>({
  name: "batsmanScorecards",
  defaults: {
    batsmanScorecards: [],
    bowlerScorecards: [],
    selectedScorecard: null
  }
})
export class ScoreCardState {
  constructor(private scoreCardService: ScoreCardService) {}

  @Selector()
  static getScorecardList(state: ScoreCardStateModel) {
    return state.batsmanScorecards;
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
          batsmanScorecards: result
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
        const state = getState();
        patchState({
          batsmanScorecards: [...state.batsmanScorecards, result]
        });
      })
    );
  }

  @Action(AddBowlerScorecard)
  addBowlerScorecard(
    { getState, patchState }: StateContext<ScoreCardStateModel>,
    { payload }: AddBowlerScorecard
  ) {
    return this.scoreCardService.addBowlerScorecard(payload).pipe(
      tap(result => {
        const state = getState();
        patchState({
          bowlerScorecards: [...state.bowlerScorecards, result]
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
    setState({
      ...state,
      selectedScorecard: payload
    });
  }
}
