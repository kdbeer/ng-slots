import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './game.reducer';

export const gameState = createFeatureSelector<GameState>('game');

export const selectAllSlots = createSelector(
  gameState,
  app => {
    return app.slots;
  }
);
