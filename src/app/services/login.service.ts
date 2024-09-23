import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponse} from "../interfaces/data-response.interface";
import {User} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:8000/api';
  private httpClient = inject(HttpClient);

  public register(data: {email?: string, password?: string, password_confirmation?: string}): Observable<DataResponse<User>> {
    return this.httpClient.post<DataResponse<User>>(`${this.baseUrl}/register`, data);
  }

  public login(user: Partial<User>): Observable<DataResponse<User>> {
    return this.httpClient.post<DataResponse<User>>(`${this.baseUrl}/login`, user);
  }
}
