import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ApiTrackHistory } from '../models/trackHistory.model';

@Injectable({
  providedIn: 'root'
})

export class TrackHistoryService {
  constructor(private http: HttpClient) {}

  getTrackHistory() {
    return this.http.get<ApiTrackHistory>(environment.apiUrl + '/tracksHistory')
  }

  postTrackHistory(id: string) {
    return this.http.post(environment.apiUrl + '/tracksHistory', id)
  }
}
