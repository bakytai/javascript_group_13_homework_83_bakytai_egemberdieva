export class TrackHistory {
  constructor(
    public id: string,
    public user: {id: string},
    public track: string,
    public dateTime: string,
  ) {}
}

export interface TrackHistoryData {
  trackId: string
}

export interface ApiTrackHistory {
  _id: string,
  user: string,
  track: string,
  dateTime: string
}
