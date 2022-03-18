export class Album {
  constructor(
    public id: string,
    public title: string,
    public year: string,
    public artist: {name: string},
    public image: string,
  ) {}
}

export interface AlbumData {
  [key: string]: any;
  title: string;
  year: string;
  artist: string;
  image: File | null;
}

export interface ApiAlbumData {
  _id: string,
  title: string,
  year: string,
  artist: {[key: string]: string},
  image: string
}
