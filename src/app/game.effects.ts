import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  RollRandom,
  GameActionTypes,
  UpdateRandomNumber,
} from './game.actions';
import { Slots } from '.';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class GameEffects {
  env = environment;

  @Effect()
  roll$ = this.actions$.pipe(
    ofType<RollRandom>(GameActionTypes.RollRandom),
    map(() => {
      console.log(this.env.SlotSize);
      const slots: Slots = {
        A: this.getRandomArbitrary(1, this.env.SlotSize),
        B: this.getRandomArbitrary(1, this.env.SlotSize),
        C: this.getRandomArbitrary(1, this.env.SlotSize),
      };

      return new UpdateRandomNumber({ slots: slots });
    })
  );

  constructor(private actions$: Actions) {}

  getRandomArbitrary(min, max): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
