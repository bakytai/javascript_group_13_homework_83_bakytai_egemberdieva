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
  deleteTrackFailure,
  deleteTrackRequest,
  deleteTrackSuccess,
  fetchTrackFailure,
  fetchTrackRequest,
  fetchTrackSuccess,
  publishTrackFailure,
  publishTrackRequest,
  publishTrackSuccess
} from './track.actions';
import { HelpersService } from '../services/helpers.service';
import { AppState } from './types';
import { Store } from '@ngrx/store';

@Injectable()

export class TracksEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private trackService: TracksService,
    private helpers: HelpersService,
    private store: Store<AppState>
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
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('Track saved!');
      }),
      catchError(() => of(createTrackFailure({error: 'Wrong Data'})))
    ))
  ));

  deleteTrack = createEffect(() => this.actions.pipe(
    ofType(deleteTrackRequest),
    mergeMap(({id, albumId}) => this.trackService.deleteTrack(id).pipe(
      map(() => deleteTrackSuccess()),
      tap(() => {
        this.store.dispatch(fetchTrackRequest({id: albumId}))
        this.helpers.openSnackbar('Track deleted!');
      }),
      catchError(() => of(deleteTrackFailure({error: 'Wrong Data'})))
    ))
  ));

  publishTrack = createEffect(() => this.actions.pipe(
    ofType(publishTrackRequest),
    mergeMap(({id, albumId}) => this.trackService.getPublish(id).pipe(
      map(() => publishTrackSuccess()),
      tap(() => {
        this.store.dispatch(fetchTrackRequest({id: albumId}))
        this.helpers.openSnackbar('Tracks published!');
      }),
      catchError(() => of(publishTrackFailure({error: 'Wrong Data'})))
    ))
  ));
}
