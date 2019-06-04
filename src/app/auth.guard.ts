import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly oauthParams = '/oauth/authorize?grant_type=authorization_code&response_type=code&client_id=first-client&state=1234';
  private readonly authUrl = `${environment.authUrl}${this.oauthParams}`;

  constructor(private userService: UserService) {
  }

  canActivate() {
    if (this.userService.hasAccess) {
      return true;
    }
    window.location.href = this.authUrl;
    return false;
  }
}
