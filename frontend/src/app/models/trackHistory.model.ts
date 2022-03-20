import { User } from './user.model';
import { TrackModel } from './track.model';

export class TrackHistory {
  constructor(
    public id: string,
    public user: User,
    public track: TrackModel,
    public dateTime: string,
  ) {}
}

export interface TrackHistoryData {
  trackId: string
}

export interface ApiTrackHistory {
  _id: string,
  user: User,
  track: TrackModel,
  dateTime: string
}
