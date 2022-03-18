export class Track {
  constructor(
    public id: string,
    public trackName: string,
    public duration: string,
  ) {}
}

export interface ApiTrackData {
  _id: string,
  album: {id: string},
  trackName: string,
  duration: string
}
