import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserData, User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(uData: RegisterUserData) {
    const userData = new FormData();

    Object.keys(uData).forEach(key => {
      if (uData[key] !== null) {
        userData.append(key, uData[key]);
      }
    });

    return this.http.post<User>(environment.apiUrl + '/users', userData);
  }
}
