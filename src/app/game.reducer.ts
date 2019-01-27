import { Action } from '@ngrx/store';

// tslint:disable-next-line:no-empty-interface
export interface GameState {}

export const initialState: GameState = {};

export function reducer(state = initialState, action: Action): GameState {
  switch (action.type) {
    default:
      return state;
  }
}
