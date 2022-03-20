import { createAction, props } from '@ngrx/store';
import { TrackModel } from '../models/track.model';

export const fetchTrackRequest = createAction(
  '[Track] Fetch Request',
  props<{id: string}>()
);
export const fetchTrackSuccess = createAction(
  '[Track] Fetch Success',
  props<{tracks: TrackModel[]}>()
);
export const fetchTrackFailure = createAction(
  '[Track] Fetch Failure',
  props<{error: string}>()
);
