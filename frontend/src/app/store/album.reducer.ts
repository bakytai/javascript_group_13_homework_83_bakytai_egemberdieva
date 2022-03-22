import { AlbumState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createAlbumFailure,
  createAlbumRequest,
  createAlbumSuccess,
  deleteAlbumFailure,
  deleteAlbumRequest,
  deleteAlbumSuccess,
  fetchAlbumsFailure,
  fetchAlbumsRequest,
  fetchAlbumsSuccess,
  publishAlbumsFailure,
  publishAlbumsRequest,
  publishAlbumsSuccess
} from './album.actions';

export const initialState: AlbumState = {
  albums: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  changeLoading: false,
  changError: null
};

export const albumsReducer = createReducer(
  initialState,
  on(fetchAlbumsRequest, state => ({...state, fetchLoading: true})),
  on(fetchAlbumsSuccess, (state, {albums}) => ({...state, fetchLoading: false, albums})),
  on(fetchAlbumsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(publishAlbumsRequest, state => ({...state, changeLoading: true})),
  on(publishAlbumsSuccess, (state, {albums}) => ({...state, changeLoading: false, albums})),
  on(publishAlbumsFailure, (state, {error}) => ({
    ...state,
    changeLoading: false,
    changError: error
  })),

  on(createAlbumRequest, state => ({...state, createLoading: true})),
  on(createAlbumSuccess, state => ({...state, createLoading: false})),
  on(createAlbumFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error})),

  on(deleteAlbumRequest, state => ({...state, deleteLoading: true})),
  on(deleteAlbumSuccess, (state, {albums}) => ({...state, deleteLoading: false, albums})),
  on(deleteAlbumFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error})),


)

