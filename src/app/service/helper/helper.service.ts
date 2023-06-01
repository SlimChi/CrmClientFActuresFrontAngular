import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private jwtHelper: JwtHelperService = new JwtHelperService();
  private decodedToken: any = {};

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token) || {};
    }
  }

  get userId(): number {
    return this.decodedToken?.id;
  }

  get userFullname(): string {
    return this.decodedToken?.sub;
  }

}
