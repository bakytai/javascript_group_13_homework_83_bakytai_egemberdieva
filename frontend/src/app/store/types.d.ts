import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { RegisterError, User } from '../models/user.model';

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

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError
}

export type AppState = {
  artists: ArtistState,
  albums: AlbumState,
  users: UserState
}
