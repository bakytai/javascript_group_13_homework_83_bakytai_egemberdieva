import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArtistsService } from '../services/artists.service';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  createArtistFailure,
  createArtistRequest, createArtistSuccess,
  fetchArtistFailure,
  fetchArtistRequest,
  fetchArtistSuccess
} from './artist.actions';

@Injectable()

export class ArtistEffects {
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
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createArtistFailure({error: 'Wrong Data'})))
    ))
  ));

  constructor(
    private router: Router,
    private actions: Actions,
    private artistsService: ArtistsService
  ) {}
}
