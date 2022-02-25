import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Album } from '../models/album.model';
import { fetchAlbumsRequest } from '../store/album.actions';

@Component({
  selector: 'app-artists-albums',
  templateUrl: './artists-albums.component.html',
  styleUrls: ['./artists-albums.component.sass']
})
export class ArtistsAlbumsComponent implements OnInit {
  albums: Observable<Album[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.albums = store.select(state => state.albums.albums);
    this.loading = store.select(state => state.albums.fetchLoading);
    this.error = store.select(state => state.albums.fetchError);
  }

  ngOnInit(): void {
    let id = ''
    this.route.params.subscribe(params => {
      id = params['id']
    })
    this.store.dispatch(fetchAlbumsRequest({id: id}));
  }

}
