import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArtistsService } from '../services/artists.service';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess,
  deleteArtistFailure,
  deleteArtistRequest,
  deleteArtistSuccess,
  fetchArtistFailure,
  fetchArtistRequest,
  fetchArtistSuccess,
  publishArtistFailure,
  publishArtistRequest,
  publishArtistSuccess
} from './artist.actions';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()

export class ArtistsEffects {
  fetchArtists = createEffect(() => this.actions.pipe(
    ofType(fetchArtistRequest),
    mergeMap(() => this.artistsService.getArtists().pipe(
      map(artists => fetchArtistSuccess({artists})),
      catchError(() => of(fetchArtistFailure({error: 'Something went wrong'})))
    ))
  ));

  createArtist = createEffect(() => this.actions.pipe(
    ofType(createArtistRequest),
    mergeMap(({artistData}) => this.artistsService.createArtist(artistData).pipe(
      map(() => createArtistSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('Artist saved!');
      }),
      catchError(() => of(createArtistFailure({error: 'Wrong Data'})))
    ))
  ));

  deleteArtist = createEffect(() => this.actions.pipe(
    ofType(deleteArtistRequest),
    mergeMap(({id}) => this.artistsService.deleteArtist(id).pipe(
      map(() => deleteArtistSuccess()),
      tap(() => {
        this.store.dispatch(fetchArtistRequest());
        this.helpers.openSnackbar('Artist deleted!');
      }),
      catchError(() => of(deleteArtistFailure({error: 'Wrong Data'})))
    ))
  ));

 publishArtist = createEffect(() => this.actions.pipe(
    ofType(publishArtistRequest),
    mergeMap(({id}) => this.artistsService.getPublish(id).pipe(
      map(() => publishArtistSuccess()),
      tap(() => {
        this.store.dispatch(fetchArtistRequest());
        this.helpers.openSnackbar('Artist published!');
      }),
      catchError(() => of(publishArtistFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private artistsService: ArtistsService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
