import { Album } from './album.model';

export class TrackModel {
  constructor(
    public id: string,
    public album: Album,
    public trackName: string,
    public duration: string,
  ) {}
}

export interface TrackData {
  album: string,
  trackName: string,
  duration: string
}

export interface ApiTrackData {
  _id: string,
  album: Album,
  trackName: string,
  duration: string
}
