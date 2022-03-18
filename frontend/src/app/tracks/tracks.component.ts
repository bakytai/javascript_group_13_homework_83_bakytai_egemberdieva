import { Component, OnInit } from '@angular/core';
import { fetchTrackRequest } from '../store/track.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../models/track.model';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.sass']
})
export class TracksComponent implements OnInit {

  tracks: Observable<Track[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.tracks = store.select(state => state.tracks.tracks);
    this.loading = store.select(state => state.tracks.fetchLoading);
    this.error = store.select(state => state.tracks.fetchError);
  }

  ngOnInit(): void {
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id']
    })
    this.store.dispatch(fetchTrackRequest({id: id}));
  }

}
