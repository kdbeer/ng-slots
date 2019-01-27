import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable } from 'rxjs';
import { Slots } from '.';
import { selectAllSlots } from './game.selectors';
import { RollRandom } from './game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-slot';

  slots$: Observable<Slots>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.slots$ = this.store$.pipe(select(selectAllSlots));
  }

  rolled() {
    this.store$.dispatch(new RollRandom());
  }
}
