import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Router } from '@angular/router';
import { TrackHistory } from '../models/trackHistory.model';
import { fetchTrackHistoryRequest } from '../store/trackHistory.actions';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit {
  userObj!: User;
  user: Observable<null | User>;
  tracksHistory: Observable<TrackHistory[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.tracksHistory = store.select(state => state.tracksHistory.tracksHistory);
    this.loading = store.select(state => state.tracksHistory.fetchLoading);
    this.error = store.select(state => state.tracksHistory.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      if (user) {
        this.userObj = user;
      } else {
        void this.router.navigate(['/'])
      }
    });
    this.store.dispatch(fetchTrackHistoryRequest());
  }


}
