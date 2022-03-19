import { TrackHistoryState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackHistoryFailure,
  createTrackHistoryRequest,
  createTrackHistorySuccess,
  fetchTrackHistoryFailure,
  fetchTrackHistoryRequest,
  fetchTrackHistorySuccess
} from './trackHistory.actions';

export const initialState: TrackHistoryState = {
  tracksHistory: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const tracksHistoryReducer = createReducer(
  initialState,
  on(fetchTrackHistoryRequest, state => ({...state, fetchLoading: true})),
  on(fetchTrackHistorySuccess, (state, {tracksHistory}) => ({...state, fetchLoading: false, tracksHistory})),
  on(fetchTrackHistoryFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createTrackHistoryRequest, state => ({...state, createLoading: true})),
  on(createTrackHistorySuccess, state => ({...state, createLoading: false})),
  on(createTrackHistoryFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),
)
