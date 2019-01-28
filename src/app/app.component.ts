import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable, noop } from 'rxjs';
import { Slots } from '.';
import { selectAllSlots } from './game.selectors';
import { RollRandom } from './game.actions';
import { environment } from 'src/environments/environment.prod';

import {
  trigger,
  state,
  animate,
  transition,
  style,
} from '@angular/animations';

const rewardList = [{ A: 1, B: 1, C: 1, reward: 'Home' }];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('cardSpinner', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      state(
        'out',
        style({ opacity: 0, display: 'none', transform: 'translateY(-100%)' })
      ),
      transition('in => out', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('0.15s', style({ transform: 'translateY(-100%)' })),
      ]),
      transition('out => in', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.15s', style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'ng-slot';
  cardImages = environment.cardImages;

  slots$: Observable<Slots>;

  rewardText = '';

  currentIndex = 0;
  intervalInstanceA;
  intervalInstanceB;
  intervalInstanceC;

  cardsDeskA = [
    { value: this.cardImages[0], state: 'out', color: '#F44336' },
    { value: this.cardImages[1], state: 'out', color: '#E91E63' },
    { value: this.cardImages[2], state: 'out', color: '#9C27B0' },
    { value: this.cardImages[3], state: 'out', color: '#673AB7' },
  ];

  cardsDeskB = [
    { value: this.cardImages[0], state: 'out', color: '#F44336' },
    { value: this.cardImages[1], state: 'out', color: '#E91E63' },
    { value: this.cardImages[2], state: 'out', color: '#9C27B0' },
    { value: this.cardImages[3], state: 'out', color: '#673AB7' },
  ];

  cardsDeskC = [
    { value: this.cardImages[0], state: 'out', color: '#F44336' },
    { value: this.cardImages[1], state: 'out', color: '#E91E63' },
    { value: this.cardImages[2], state: 'out', color: '#9C27B0' },
    { value: this.cardImages[3], state: 'out', color: '#673AB7' },
  ];

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.slots$ = this.store$.pipe(select(selectAllSlots));

    this.store$.pipe(select(selectAllSlots)).subscribe(res => {
      this.clearInterval();
      this.rewardText = this.checkReward(res);
      console.log(res);
      // this.animateSpin(res.A, res.B, res.C);
      // this.animateSpinByCard(this.cards, res.A);
      this.animateSpinSlotsC(this.cardsDeskA, res.A);
      this.animateSpinSlotsC(this.cardsDeskB, res.B);
      this.animateSpinSlotsC(this.cardsDeskC, res.C);
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

  animateSpinSlotsA(slots, currentIndex) {
    slots.forEach(slot => (slot.state = 'out'));
    let slotIndex = currentIndex;
    slots[currentIndex].state = 'in';

    clearInterval(this.intervalInstanceA);
    this.intervalInstanceA = setInterval(() => {
      console.log('CRI: ' + slotIndex + ' ' + 'IA: ' + currentIndex);
      slotIndex++;
      if (slotIndex === this.cardsDeskA.length) {
        slotIndex = 0;
      }

      if (slotIndex !== 0) {
        this.cardsDeskA[slotIndex - 1].state = 'out';
      } else {
        this.cardsDeskA[this.cardsDeskA.length - 1].state = 'out';
      }
      this.cardsDeskA[slotIndex].state = 'in';
    }, 100);
    return;
  }

  animateSpinSlotsB(slots, currentIndex) {
    slots.forEach(slot => (slot.state = 'out'));
    let slotIndex = currentIndex;
    slots[currentIndex].state = 'in';

    clearInterval(this.intervalInstanceB);
    this.intervalInstanceB = setInterval(() => {
      console.log('CRI: ' + slotIndex + ' ' + 'IA: ' + currentIndex);
      slotIndex++;
      if (slotIndex === this.cardsDeskB.length) {
        slotIndex = 0;
      }

      if (slotIndex !== 0) {
        this.cardsDeskB[slotIndex - 1].state = 'out';
      } else {
        this.cardsDeskB[this.cardsDeskB.length - 1].state = 'out';
      }
      this.cardsDeskB[slotIndex].state = 'in';
    }, 100);
    return;
  }

  animateSpinSlotsC(slots, currentIndex) {
    slots.forEach(slot => (slot.state = 'out'));
    let slotIndex = currentIndex;
    slots[currentIndex].state = 'in';

    clearInterval(this.intervalInstanceC);
    this.intervalInstanceC = setInterval(() => {
      console.log('CRI: ' + slotIndex + ' ' + 'IA: ' + currentIndex);
      slotIndex++;
      if (slotIndex === this.cardsDeskC.length) {
        slotIndex = 0;
      }

      if (slotIndex !== 0) {
        this.cardsDeskC[slotIndex - 1].state = 'out';
      } else {
        this.cardsDeskC[this.cardsDeskC.length - 1].state = 'out';
      }
      this.cardsDeskC[slotIndex].state = 'in';
    }, 100);
    return;
  }

  clearInterval() {
    const itemIndex = Math.floor(Math.random() * 4);
    setTimeout(() => {
      clearInterval(this.intervalInstanceA);
      clearInterval(this.intervalInstanceB);
      clearInterval(this.intervalInstanceC);
    }, itemIndex * 100);
  }
}
