import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, NEVER, of, withLatestFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  createTrackHistoryFailure,
  createTrackHistoryRequest,
  createTrackHistorySuccess,
  fetchTrackHistoryFailure,
  fetchTrackHistoryRequest,
  fetchTrackHistorySuccess
} from './trackHistory.actions';
import { TrackHistoryService } from '../services/trackHistory.service';
import { HelpersService } from '../services/helpers.service';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()

export class TrackHistoryEffects {
  fetchTracksHistory = createEffect(() => this.actions.pipe(
    ofType(fetchTrackHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([_, user]) => {
      if (user) {
        return this.trackHistoryService.getTrackHistory(user.token).pipe(
          map(tracksHistory => fetchTrackHistorySuccess({tracksHistory})),
          catchError(() => of(fetchTrackHistoryFailure({error: 'Something went wrong'})))
        );
      }

      return NEVER;
    })
  ));

  createTrackHistory = createEffect(() => this.actions.pipe(
    ofType(createTrackHistoryRequest),
    withLatestFrom(this.store.select(state => state.users.user)),
    mergeMap(([{trackHistoryData}, user]) => {
      if (user) {
        return this.trackHistoryService.postTrackHistory(trackHistoryData,user.token).pipe(
          map(() => createTrackHistorySuccess()),
          tap(() => this.helpers.openSnackbar('Track history saved!'))
        );
      }

      return NEVER;
    }),
      catchError(() => of(createTrackHistoryFailure({error: 'Wrong Data'})))
    ));


  constructor(
    private router: Router,
    private actions: Actions,
    private trackHistoryService: TrackHistoryService,
    private helpers: HelpersService,
    private store: Store<AppState>
  ) {}
}
