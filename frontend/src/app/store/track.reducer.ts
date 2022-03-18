import { TrackState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchTrackFailure, fetchTrackRequest, fetchTrackSuccess } from './track.actions';

export const initialState: TrackState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTrackRequest, state => ({...state, fetchLoading: true})),
  on(fetchTrackSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTrackFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  }))
)
