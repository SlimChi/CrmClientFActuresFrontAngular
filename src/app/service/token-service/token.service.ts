import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";


import {HttpClient} from "@angular/common/http";




@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private cookieName = 'myAppToken';
  private tokenUrl = 'https://api.braintreegateway.com/merchants/3fw8jj3xr2wj6cxz/token';

  constructor(private router: Router,

              private http: HttpClient) {
  }
  private jwtHelper = new JwtHelperService();

  savetoken(token: string): void {
    localStorage.setItem('token', token)
    this.router.navigate(['admin','user'])
  }

  public isLogged(): boolean {
    const token = localStorage.getItem('token')
    // console.log(token)
    return !!token
  }

  public clearToken(): void {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  savetokenInCookie(token: string): void {
    document.cookie = `token=${token}`;
  }


  getToken(): string {
    return localStorage.getItem('token') || '';
  }



  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  sendPaymentNonce(nonce: string): Promise<any> {
    const headers = {
      'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    const body = {
      paymentMethodNonce: nonce
    };
    return this.http.post(this.tokenUrl, body, options).toPromise();
  }
}
