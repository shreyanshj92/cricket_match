import { TeamNameModel } from "./teamname.model";
import { TeamPlayerModel } from "./teamplayer.model";

export interface TeamFormationModel {
  teamName: string;
  teamplayer: TeamPlayerModel[];
}
