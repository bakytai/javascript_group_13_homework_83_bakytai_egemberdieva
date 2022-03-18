export class Track {
  constructor(
    public id: string,
    public artist: {name: string},
    public trackName: string,
    public duration: string,
  ) {}
}

export interface ApiTrackData {
  _id: string,
  artist: {name: string},
  trackName: string,
  duration: string
}
