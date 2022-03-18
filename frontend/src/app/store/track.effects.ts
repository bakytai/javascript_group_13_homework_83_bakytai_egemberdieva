import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TracksService } from '../services/tracks.service';
import { catchError, mergeMap, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { fetchTrackFailure, fetchTrackRequest, fetchTrackSuccess } from './track.actions';

@Injectable()

export class TrackEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private trackService: TracksService
  ) {}

  fetchTracks = createEffect(() => this.actions.pipe(
    ofType(fetchTrackRequest),
    mergeMap(({id}) => this.trackService.getTracks(id).pipe(
      map(tracks => fetchTrackSuccess({tracks})),
      catchError(() => of(fetchTrackFailure({error: 'Something went wrong'})))
    ))
  ));
}
