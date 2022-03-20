import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiTrackHistory, TrackHistory, TrackHistoryData } from '../models/trackHistory.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TrackHistoryService {
  constructor(private http: HttpClient) {}

  getTrackHistory(token: string) {
    return this.http.get<ApiTrackHistory[]>(environment.apiUrl + '/tracksHistory', {
      headers: new HttpHeaders({'Authorization': token})
    }).pipe(
      map(response => {
        return response.map(trackData => {
          return new TrackHistory(trackData._id, trackData.user, trackData.track, trackData.dateTime);
        });
      })
    );
  }

  postTrackHistory(trackHistoryData: TrackHistoryData, token: string) {
    return this.http.post(environment.apiUrl + '/tracksHistory', trackHistoryData, {
      headers: new HttpHeaders({'Authorization': token})
    });
  }
}
