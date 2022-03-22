import { Component, OnInit } from '@angular/core';
import { deleteTrackRequest, fetchTrackRequest, publishTrackRequest } from '../store/track.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { ActivatedRoute } from '@angular/router';
import { TrackModel } from '../models/track.model';
import { User } from '../models/user.model';
import { createTrackHistoryRequest } from '../store/trackHistory.actions';
import { HelpersService } from '../services/helpers.service';
import { TrackHistoryData } from '../models/trackHistory.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit {
  userObj!: User;
  user: Observable<null | User>;
  tracks: Observable<TrackModel[]>;
  loading: Observable<boolean>;
  error: Observable<null | string>;
  token!: string;
  albumId!: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private helpers: HelpersService) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.loading = store.select(state => state.tracks.fetchLoading);
    this.error = store.select(state => state.tracks.fetchError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id']
    })
    this.store.dispatch(fetchTrackRequest({id: this.albumId}));

    this.user.subscribe(user => {
      if (user) {
        this.userObj = user;
        this.token = this.userObj.token
      }
    });
  }

  createTrackHistory(id: string) {
    if (this.userObj) {
      const trackHistoryData: TrackHistoryData = {
        trackId: id
      };
      this.store.dispatch(createTrackHistoryRequest({trackHistoryData}));
    } else {
      this.helpers.openSnackbar('Log in to your account!');
    }
  }

  delete(id: string) {
    const albumId = this.albumId;
    this.store.dispatch(deleteTrackRequest({id,albumId}));
  }

  publish(id: string) {
    const albumId = this.albumId;
    this.store.dispatch(publishTrackRequest({id, albumId}));
  }
}
