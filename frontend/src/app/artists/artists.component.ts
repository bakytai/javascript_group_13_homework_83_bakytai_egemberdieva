import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist.model';
import { deleteArtistRequest, fetchArtistRequest, publishArtistRequest } from '../store/artist.actions';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.sass']
})
export class ArtistsComponent implements OnInit {
  artists: Observable<Artist[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.artists = store.select(state => state.artists.artists);
    this.loading = store.select(state => state.artists.fetchLoading);
    this.error = store.select(state => state.artists.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }

  publish(id: string) {
    this.store.dispatch(publishArtistRequest({id}));
  }

  delete(id: string) {
    this.store.dispatch(deleteArtistRequest({id}));
  }
}
