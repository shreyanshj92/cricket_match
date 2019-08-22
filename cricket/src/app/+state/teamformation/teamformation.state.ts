import { State, Action, StateContext, Selector } from "@ngxs/store";
import { AddTeam, GetTeams, SetSelectedTeam } from "./teamformation.actions";
import { TeamformationService } from "../../services/teamformation/teamformation.service";
import { tap } from "rxjs/operators";
import { TeamFormationModel } from "src/app/services/models/teamformation.model";

export class TeamStateModel {
  teams: TeamFormationModel[];
  selectedTeam: TeamFormationModel;
}

@State<TeamStateModel>({
  name: "teams",
  defaults: {
    teams: [],
    selectedTeam: null
  }
})
export class TeamState {
  constructor(private teamformationService: TeamformationService) {}

  @Selector()
  static getTeamList(state: TeamStateModel) {
    return state.teams;
  }

  @Selector()
  static getSelectedTeam(state: TeamStateModel) {
    return state.selectedTeam;
  }

  @Action(GetTeams)
  getTeams({ getState, setState }: StateContext<TeamStateModel>) {
    return this.teamformationService.fetchTeams().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          teams: result
        });
      })
    );
  }

  @Action(AddTeam)
  addTeam(
    { getState, patchState }: StateContext<TeamStateModel>,
    { payload }: AddTeam
  ) {
    return this.teamformationService.addTeam(payload).pipe(
      tap(result => {
        const state = getState();
        patchState({
          teams: [...state.teams, result]
        });
      })
    );
  }

  @Action(SetSelectedTeam)
  setSelectedTeamId(
    { getState, setState }: StateContext<TeamStateModel>,
    { payload }: SetSelectedTeam
  ) {
    const state = getState();
    console.log(state);
    setState({
      ...state,
      selectedTeam: payload
    });
  }
}
