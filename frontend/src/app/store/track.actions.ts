import { createAction, props } from '@ngrx/store';
import { TrackData, TrackModel } from '../models/track.model';

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

export const createTrackRequest = createAction(
  '[Track] Create Request',
  props<{trackData: TrackData}>()
);
export const createTrackSuccess = createAction(
  '[Track] Create Success'
);
export const createTrackFailure = createAction(
  '[Track] Create Failure',
  props<{error: string}>()
);
