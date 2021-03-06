import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getOtp(phonenumber): Observable<any> {
    return this.http.post(`${this.apiUrl}/get-otp`, {"phoneNumber": phonenumber})
  }

  verifyOtp(body): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, body)
  }

  getAllUser(param?): Observable<any> {
    let params;
    if (param) {
      params = new HttpParams()
      Object.keys(param).forEach(
        key => param[key] && (params = params.append(key, param[key]))
      );
    }
    return this.http.get(`${this.apiUrl}`, { params: params })
  }

  checkExistUser(phoneNumber): Observable<any> {
    return this.http.get(`${this.apiUrl}/${phoneNumber}`);
  }
}
