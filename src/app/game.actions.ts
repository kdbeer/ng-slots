import { Action } from '@ngrx/store';
import { Slots } from '.';

export enum GameActionTypes {
  LoadGames = '[Game] Load Games',
  RollRandom = '[Game] Roll Random',
  UpdateRandomNumber = '[Game] Update Random Number',
}

export class LoadGames implements Action {
  readonly type = GameActionTypes.LoadGames;
}

export class RollRandom implements Action {
  readonly type = GameActionTypes.RollRandom;
}

export class UpdateRandomNumber implements Action {
  readonly type = GameActionTypes.UpdateRandomNumber;
  constructor(public payload: { slots: Slots }) {}
}

export type GameActions = LoadGames | RollRandom | UpdateRandomNumber;
