import { BatsmanScoreModel } from "./batsmanscore.model";
import { BowlerScoreModel } from "./bowlerscore.model";
export interface TeamPlayerScoreBatsmanModel {
  teamName: string;
  playerScore: BatsmanScoreModel;
}

export interface TeamPlayerScoreBowlerModel {
  teamName: string;
  playerScore: BowlerScoreModel;
}
