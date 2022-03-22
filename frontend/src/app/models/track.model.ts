import { Album } from './album.model';

export class TrackModel {
  constructor(
    public id: string,
    public album: Album,
    public trackName: string,
    public duration: string,
    public is_publish: boolean
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
  duration: string,
  is_publish: boolean
}
