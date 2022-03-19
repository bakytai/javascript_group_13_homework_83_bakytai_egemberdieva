import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of } from 'rxjs';
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

@Injectable()

export class TrackHistoryEffects {
  fetchTracksHistory = createEffect(() => this.actions.pipe(
    ofType(fetchTrackHistoryRequest),
    mergeMap(({token}) => this.trackHistoryService.getTrackHistory(token).pipe(
      map(tracksHistory => fetchTrackHistorySuccess({tracksHistory})),
      catchError(() => of(fetchTrackHistoryFailure({error: 'Something went wrong'})))
    ))
  ));

  createTrackHistory = createEffect(() => this.actions.pipe(
    ofType(createTrackHistoryRequest),
    mergeMap(({trackHistoryData, token}) => this.trackHistoryService.postTrackHistory(trackHistoryData, token).pipe(
      map(() => createTrackHistorySuccess()),
      tap(() => {
        this.helpers.openSnackbar('Track History saved!');
      }),
      catchError(() => of(createTrackHistoryFailure({error: 'Wrong Data'})))
    ))
  ));


  constructor(
    private router: Router,
    private actions: Actions,
    private trackHistoryService: TrackHistoryService,
    private helpers: HelpersService
  ) {}
}
