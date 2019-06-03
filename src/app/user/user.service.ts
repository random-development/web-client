import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccessData } from './access-data';
import { CheckTokenData } from './check-token-data';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private urlPrefix = 'http://';
  private credentials = 'first-client:noonewilleverguess';
  private urlBase = 'localhost:7000/oauth/';
  // private urlBase = 'hibron.usermd.net:7000/oauth/';
  private tokenActive = false;

  public token: string;
  public userName: string;
  public clientId: string;

  constructor(private http: HttpClient, private router: Router) { }

  get hasAccess() {
    return !!this.token && this.tokenActive && !!this.userName;
  }

  login(code) {
    if (!code) {
      return;
    }

    const authUrl = this.urlPrefix + this.urlBase + 'token';
    this.http.post(authUrl, {}, {
      params: { code, grant_type: 'authorization_code' },
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa(this.credentials) 
      }
    }).subscribe((accessData: AccessData) => {
      if (!accessData) {
        return;
      }
      if (accessData.expires_in <= 0) {
        this.tokenActive = false;
        return;
      }

      this.tokenActive = true;
      this.token = accessData.access_token;

      const tokenDataUrl = this.urlPrefix + this.urlBase + 'check_token';
      this.http.post(tokenDataUrl, {}, { params: { token: this.token } }).subscribe((tokenData: CheckTokenData) => {
        if (!tokenData) {
          return;
        }

        this.userName = tokenData.user_name;
        this.clientId = tokenData.client_id;

        if (this.hasAccess) {
          this.router.navigate(['']);
        }
      })
    });
  }
}
