import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { Slots } from '.';
import { selectAllSlots } from './game.selectors';
import { RollRandom } from './game.actions';

const rewardList = [{ A: 1, B: 1, C: 1, reward: 'Home' }];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-slot';

  slots$: Observable<Slots>;

  rewardText = '';

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.slots$ = this.store$.pipe(select(selectAllSlots));

    this.store$.pipe(select(selectAllSlots)).subscribe(res => {
      this.rewardText = this.checkReward(res);
    });
  }

  rolled() {
    this.store$.dispatch(new RollRandom());
  }

  checkReward(m: Slots): string {
    const rewards = rewardList
      .map(val => {
        if (val.A === m.A && val.B === m.B && val.C === val.C) {
          return val.reward;
        }
      })
      .filter(val => val !== undefined);

    if (rewards.length > 0) {
      return rewards[0];
    }

    return 'คุณไม่ได้รางวัล';
  }
}
