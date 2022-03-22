import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AlbumsService } from '../services/albums.service';
import { catchError, mergeMap, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  deleteAlbumFailure,
  deleteAlbumRequest,
  deleteAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  publishAlbumsFailure,
  publishAlbumsRequest,
  publishAlbumsSuccess
} from './album.actions';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()

export class AlbumsEffects {
  fetchAlbums = createEffect(() => this.actions.pipe(
    ofType(fetchAlbumsRequest),
    mergeMap((artistId:{id: string}) => this.albumService.getAlbums(artistId.id).pipe(
      map(albums => fetchAlbumsSuccess({albums})),
      catchError(() => of(fetchAlbumsFailure({error: 'Something went wrong'})))
    ))
  ));

  createAlbum = createEffect(() => this.actions.pipe(
    ofType(createAlbumRequest),
    mergeMap(({albumData}) => this.albumService.createAlbum(albumData).pipe(
      map(() => createAlbumSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('Album saved!');
      }),
      catchError(() => of(createAlbumFailure({error: 'Wrong Data'})))
    ))
  ));

  deleteAlbum = createEffect(() => this.actions.pipe(
    ofType(deleteAlbumRequest),
    mergeMap(({id, artistId}) => this.albumService.deleteAlbum(id).pipe(
      map(() => deleteAlbumSuccess()),
      tap(() => {
        this.store.dispatch(fetchAlbumsRequest({id: artistId}));
        this.helpers.openSnackbar('Album deleted!');
      }),
      catchError(() => of(deleteAlbumFailure({error: 'Wrong Data'})))
    ))
  ));

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishAlbumsRequest),
    mergeMap(({id, artistId}) => this.albumService.getPublish(id).pipe(
      map(() => publishAlbumsSuccess()),
      tap(() => {
        this.store.dispatch(fetchAlbumsRequest({id: artistId}));
        this.helpers.openSnackbar('Album published!');
      }),
      catchError(() => of(publishAlbumsFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private albumService: AlbumsService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
