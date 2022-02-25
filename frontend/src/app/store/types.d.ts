import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';

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

export type AppState = {
  artists: ArtistState,
  albums: AlbumState
}
