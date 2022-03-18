import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { TracksService } from '../services/tracks.service';

@Injectable()

export class TrackEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private trackService: TracksService
  ) {}
}
