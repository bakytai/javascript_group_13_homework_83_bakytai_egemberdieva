import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Album } from '../../models/album.model';
import { fetchAlbumsRequest } from '../../store/album.actions';
import { TrackData } from '../../models/track.model';
import { createTrackRequest } from '../../store/track.actions';

@Component({
  selector: 'app-edit-tracks',
  templateUrl: './edit-tracks.component.html',
  styleUrls: ['./edit-tracks.component.sass']
})
export class EditTracksComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  albums: Observable<Album[]>;
  error: Observable<string | null>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
    this.albums = store.select(state => state.albums.albums);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchAlbumsRequest({id: ''}));
  }

  onSubmit() {
    const trackData: TrackData = this.form.value;
    this.store.dispatch(createTrackRequest({trackData}));
  }
}
