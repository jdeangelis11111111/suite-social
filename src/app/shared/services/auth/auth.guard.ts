import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated = true; // Set this value dynamically

  constructor(private router: Router, private auth: LoginService) { }
  /*   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.isAuthenticated) {
        return true
      }
      this.router.navigate(['/login']);
      return false;
    } */
  canActivate() {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}