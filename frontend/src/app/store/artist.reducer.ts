import { ArtistState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createArtistFailure,
  createArtistRequest,
  createArtistSuccess, deleteArtistFailure,
  deleteArtistRequest, deleteArtistSuccess,
  fetchArtistFailure,
  fetchArtistRequest,
  fetchArtistSuccess, publishArtistFailure, publishArtistRequest, publishArtistSuccess
} from './artist.actions';

const initialState: ArtistState = {
  artists: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  changeLoading: false,
  changError: null
};

export const artistsReducer = createReducer(
  initialState,
  on(fetchArtistRequest, state => ({...state, fetchLoading: true})),
  on(fetchArtistSuccess, (state, {artists}) => ({...state, fetchLoading: false, artists})),
  on(fetchArtistFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(publishArtistRequest, state => ({...state, changeLoading: true})),
  on(publishArtistSuccess, (state, {artists}) => ({...state, changeLoading: false, artists})),
  on(publishArtistFailure, (state, {error}) => ({
    ...state,
    changeLoading: false,
    changError: error
  })),

  on(createArtistRequest, state => ({...state, createLoading: true})),
  on(createArtistSuccess, state => ({...state, createLoading: false})),
  on(createArtistFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteArtistRequest, state => ({...state, deleteLoading: true})),
  on(deleteArtistSuccess, state => ({...state, deleteLoading: false})),
  on(deleteArtistFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),
)
