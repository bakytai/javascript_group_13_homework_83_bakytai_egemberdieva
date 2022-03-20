import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiTrackData, TrackModel } from '../models/track.model';

@Injectable({
  providedIn: 'root'
})

export class TracksService{

  constructor(public http: HttpClient) {
  }

  getTracks(albumId: string) {
    return this.http.get<ApiTrackData[]>(environment.apiUrl + '/tracks?album=' + albumId).pipe(
      map(response => {
        return response.map(trackData => {
          return new TrackModel(trackData._id, trackData.album, trackData.trackName, trackData.duration);
        });
      })
    );
  }
}
