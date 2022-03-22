import { TrackState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createTrackFailure,
  createTrackRequest,
  createTrackSuccess,
  deleteTrackFailure,
  deleteTrackRequest,
  deleteTrackSuccess,
  fetchTrackFailure,
  fetchTrackRequest,
  fetchTrackSuccess,
  publishTrackFailure,
  publishTrackRequest,
  publishTrackSuccess
} from './track.actions';

export const initialState: TrackState = {
  tracks: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  changeLoading: false,
  changError: null
};

export const tracksReducer = createReducer(
  initialState,
  on(fetchTrackRequest, state => ({...state, fetchLoading: true})),
  on(fetchTrackSuccess, (state, {tracks}) => ({...state, fetchLoading: false, tracks})),
  on(fetchTrackFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(publishTrackRequest, state => ({...state, changeLoading: true})),
  on(publishTrackSuccess, (state, {tracks}) => ({...state, changeLoading: false, tracks})),
  on(publishTrackFailure, (state, {error}) => ({
    ...state,
    changeLoading: false,
    changError: error
  })),

  on(createTrackRequest, state => ({...state, createLoading: true})),
  on(createTrackSuccess, state => ({...state, createLoading: false})),
  on(createTrackFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteTrackRequest, state => ({...state, deleteLoading: true})),
  on(deleteTrackSuccess, state => ({...state, deleteLoading: false})),
  on(deleteTrackFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),
)
