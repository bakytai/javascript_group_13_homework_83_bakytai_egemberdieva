export class Artist {
  constructor(
    public id: string,
    public name: string,
    public information: string,
    public image: string,
    public is_published: boolean
  ) {}
}

export interface ArtistData {
  [key: string]: any;
  name: string;
  information: string;
  image: File | null;
}

export interface ApiArtistData {
  _id: string,
  name: string,
  information: string,
  image: string,
  is_published: boolean
}
