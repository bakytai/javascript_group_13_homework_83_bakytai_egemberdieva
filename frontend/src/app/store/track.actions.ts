import { createAction, props } from '@ngrx/store';
import { Track } from '../models/track.model';

export const fetchTrackRequest = createAction(
  '[Track] Fetch Request',
  props<{id: string}>()
);
export const fetchTrackSuccess = createAction(
  '[Track] Fetch Success',
  props<{tracks: Track[]}>()
);
export const fetchTrackFailure = createAction(
  '[Track] Fetch Failure',
  props<{error: string}>()
);
