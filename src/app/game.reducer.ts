import { Action } from '@ngrx/store';
import { Slots } from '.';
import { GameActions, GameActionTypes } from './game.actions';

// tslint:disable-next-line:no-empty-interface
export interface GameState {
  slots: Slots;
}

export const initialState: GameState = {
  slots: { A: 1, C: 1, B: 1 },
};

export function reducer(state = initialState, action: GameActions): GameState {
  switch (action.type) {
    case GameActionTypes.UpdateRandomNumber:
      return { ...state, slots: action.payload.slots };
    default:
      return state;
  }
}
