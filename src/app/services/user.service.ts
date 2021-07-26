import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = "http://202.92.4.184:8585/CapstoneApi/api/v1/users";
  constructor(private http: HttpClient) { }

  registerUser(body): Observable<any> {
    return this.http.post(`${this.apiUrl}`, body)
  }
}
