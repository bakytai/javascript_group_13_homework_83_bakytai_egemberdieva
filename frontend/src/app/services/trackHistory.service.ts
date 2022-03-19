import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TrackHistoryService {
  constructor(private http: HttpClient) {}


}
