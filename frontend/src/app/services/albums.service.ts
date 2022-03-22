import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Album, AlbumData, ApiAlbumData } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})

export class AlbumsService {
  constructor(private http: HttpClient) {}

  getAlbums(artistId: string) {
    return this.http.get<ApiAlbumData[]>(environment.apiUrl + '/albums?artist=' + artistId).pipe(
      map(response => {
        return response.map(albumData => {
          return new Album(albumData._id, albumData.title, albumData.year, albumData.artist, albumData.image);
        });
      })
    );
  }

  createAlbum(album: AlbumData) {
    const formData = new FormData();

    Object.keys(album).forEach(key => {
      if (album[key] !== null) {
        formData.append(key, album[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/albums', formData);
  };

  deleteAlbum(id: string) {
    return this.http.delete(environment.apiUrl + '/albums/' + id);
  }
}
