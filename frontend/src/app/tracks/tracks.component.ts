import { Component, OnInit } from '@angular/core';
import { fetchTrackRequest } from '../store/track.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../models/track.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit {
  userObj!: User;
  user: Observable<null | User>;
  tracks: Observable<Track[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  token!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.loading = store.select(state => state.tracks.fetchLoading);
    this.error = store.select(state => state.tracks.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id']
    })
    this.store.dispatch(fetchTrackRequest({id: id}));

    this.user.subscribe(user => {
      if (user) {
        this.userObj = user;
        this.token = this.userObj.token
      }
    });
  }

  createTrackHistory(id: string) {

  }
}
