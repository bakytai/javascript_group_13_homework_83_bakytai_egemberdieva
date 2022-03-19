import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-history',
  templateUrl: './track-history.component.html',
  styleUrls: ['./track-history.component.sass']
})
export class TrackHistoryComponent implements OnInit {
  userObj!: User;
  user: Observable<null | User>;
  // tracksHistory: Observable<TrackHistory[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  token!: string;

  constructor(private store: Store<AppState>, private router: Router) {

    this.loading = store.select(state => state.tracks.fetchLoading);
    this.error = store.select(state => state.tracks.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.user.subscribe(user => {
      if (user) {
        this.userObj = user;
        this.token = this.userObj.token
      } else {
        void this.router.navigate(['/'])
      }
    });
  }

}
