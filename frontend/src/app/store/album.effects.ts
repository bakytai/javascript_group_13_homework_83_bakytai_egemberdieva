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
    mergeMap(({id}) => this.albumService.deleteAlbum(id).pipe(
      map(albums => deleteAlbumSuccess({albums})),
      tap(() => {
        this.helpers.openSnackbar('Album deleted!');
      }),
      catchError(() => of(deleteAlbumFailure({error: 'Wrong Data'})))
    ))
  ));

  publishAlbum = createEffect(() => this.actions.pipe(
    ofType(publishAlbumsRequest),
    mergeMap(({id}) => this.albumService.getPublish(id).pipe(
      map(albums => publishAlbumsSuccess({albums})),
      tap(() => {
        this.helpers.openSnackbar('Artist published!');
      }),
      catchError(() => of(publishAlbumsFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private albumService: AlbumsService,
    private helpers: HelpersService
  ) {}
}
