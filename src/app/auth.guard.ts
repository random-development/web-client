import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // private authServerAddress = 'http://localhost:8081';
  // private authUrl = '/oauth/authorize?grant_type=authorization_code&response_type=code&client_id=first-client&state=1234';
  private authUrl = 'http://localhost:7000/oauth/authorize?grant_type=authorization_code&response_type=code&client_id=first-client&state=1234';

  constructor(private userService: UserService) {
    // constructor(private userService: UserService, private router: Router) {
  }

  canActivate() {
    if (this.userService.hasAccess) {
      return true;
    };
    // this.router.navigate([this.authServerAddress, { externalUrl: this.authUrl }]);
    window.location.href = this.authUrl;
    return false;
  }
}
