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
    mergeMap(() => this.trackHistoryService.getTrackHistory().pipe(
      map(tracksHistory => fetchTrackHistorySuccess({tracksHistory})),
      catchError(() => of(fetchTrackHistoryFailure({error: 'Wrong data'})))
    ))
  ));

  createTrackHistory = createEffect(() => this.actions.pipe(
    ofType(createTrackHistoryRequest),
    mergeMap(({trackHistoryData}) => this.trackHistoryService.postTrackHistory(trackHistoryData).pipe(
      map(() => createTrackHistorySuccess()),
      tap(() => this.helpers.openSnackbar('Track History Saved!')),
      catchError(() => of(createTrackHistoryFailure({error: 'Wrong data'})))
    ))
  ));


  constructor(
    private router: Router,
    private actions: Actions,
    private trackHistoryService: TrackHistoryService,
    private helpers: HelpersService
  ) {}
}
