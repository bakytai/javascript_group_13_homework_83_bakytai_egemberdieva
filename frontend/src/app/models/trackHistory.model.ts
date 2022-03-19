export class TrackHistory {
  constructor(
    public id: string,
    public artistName: {name: string},
    public track: {name: string},
    public dateTime: string,
  ) {}
}

export interface TrackHistoryData {
  trackId: string
}

export interface ApiTrackHistory {
  _id: string,
  artistName: {name: string},
  track: {name: string},
  dateTime: string
}
