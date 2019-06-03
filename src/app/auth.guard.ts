import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authUrl = 'http://localhost:7000/oauth/authorize?grant_type=authorization_code&response_type=code&client_id=first-client&state=1234';
  // private authUrl = 'http://hibron.usermd.net:7000/oauth/authorize?grant_type=authorization_code&response_type=code&client_id=first-client&state=1234';

  constructor(private userService: UserService) {
  }

  canActivate() {
    if (this.userService.hasAccess) {
      return true;
    };
    window.location.href = this.authUrl;
    return false;
  }
}
