import { createAction, props } from '@ngrx/store';
import { TrackHistory, TrackHistoryData } from '../models/trackHistory.model';

export const fetchTrackHistoryRequest = createAction(
  '[TracksHistory] Fetch Request',
  props<{token: string}>()
);
export const fetchTrackHistorySuccess = createAction(
  '[TracksHistory] Fetch Success',
  props<{tracksHistory: TrackHistory[]}>()
);
export const fetchTrackHistoryFailure = createAction(
  '[TracksHistory] Fetch Failure',
  props<{error: string}>()
);

export const createTrackHistoryRequest = createAction(
  '[TracksHistory] Create Request',
  props<{trackHistoryData: TrackHistoryData}>()
);
export const createTrackHistorySuccess = createAction(
  '[TracksHistory] Create Success'
);
export const createTrackHistoryFailure = createAction(
  '[TracksHistory] Create Failure',
  props<{error: string}>()
);
