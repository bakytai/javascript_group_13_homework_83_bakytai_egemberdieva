import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Artist } from '../../models/artist.model';
import { fetchArtistRequest } from '../../store/artist.actions';
import { createAlbumRequest } from '../../store/album.actions';
import { AlbumData } from '../../models/album.model';

@Component({
  selector: 'app-edit-albums',
  templateUrl: './edit-albums.component.html',
  styleUrls: ['./edit-albums.component.sass']
})
export class EditAlbumsComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  artists: Observable<Artist[]>;
  error: Observable<string | null>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.albums.createLoading);
    this.error = store.select(state => state.albums.createError);
    this.artists = store.select(state => state.artists.artists);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchArtistRequest());
  }

  onSubmit() {
    const albumData: AlbumData = this.form.value;
    this.store.dispatch(createAlbumRequest({albumData}))
  }
}
