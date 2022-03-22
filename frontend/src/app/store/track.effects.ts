import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TracksService } from '../services/tracks.service';
import { catchError, mergeMap, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  fetchTrackFailure,
  fetchTrackRequest,
  fetchTrackSuccess
} from './track.actions';
import { HelpersService } from '../services/helpers.service';

@Injectable()

export class TracksEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private trackService: TracksService,
    private helpers: HelpersService
  ) {}

  fetchTracks = createEffect(() => this.actions.pipe(
    ofType(fetchTrackRequest),
    mergeMap(({id}) => this.trackService.getTracks(id).pipe(
      map(tracks => fetchTrackSuccess({tracks})),
      catchError(() => of(fetchTrackFailure({error: 'Something went wrong'})))
    ))
  ));

  createTrack = createEffect(() => this.actions.pipe(
    ofType(createTrackRequest),
    mergeMap(({trackData}) => this.trackService.createTrack(trackData).pipe(
      map(() => createTrackSuccess()),
      tap(() => {
        this.router.navigate(['/']);
        this.helpers.openSnackbar('Track saved!');
      }),
      catchError(() => of(createTrackFailure({error: 'Wrong Data'})))
    ))
  ));
}
