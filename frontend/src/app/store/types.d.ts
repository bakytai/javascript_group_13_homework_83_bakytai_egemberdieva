import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { TrackModel } from '../models/track.model';
import { TrackHistory } from '../models/trackHistory.model';

export type ArtistState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AlbumState = {
  albums: Album[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type TrackState = {
  tracks: TrackModel[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type TrackHistoryState = {
  tracksHistory: TrackHistory[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  artists: ArtistState,
  albums: AlbumState,
  tracks: TrackState,
  tracksHistory: TrackHistoryState
  users: UserState
}
