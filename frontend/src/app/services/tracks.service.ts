import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ApiTrackData, TrackData, TrackModel } from '../models/track.model';

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
          return new TrackModel(trackData._id, trackData.album, trackData.trackName, trackData.duration,
            trackData.is_published);
        });
      })
    );
  };

  getPublish(id: string) {
    return this.http.post(environment.apiUrl + `/tracks/${id}/publish`, {is_publish: true});
  }

  createTrack(trackData: TrackData) {
    return this.http.post(environment.apiUrl + '/tracks', trackData);
  }

  deleteTrack(id: string) {
    return this.http.delete<ApiTrackData[]>(environment.apiUrl + '/tracks/' + id);
  }
}
