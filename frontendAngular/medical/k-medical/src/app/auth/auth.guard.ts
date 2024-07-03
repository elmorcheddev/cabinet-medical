import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';   
import { AdminAuthService } from '../monService/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminAuthService.getToken() !== null) {
      const allowedRoles = route.data['rolesUtilisateur'] as string[];
      const userRole = this.adminAuthService.getUserRole(); // Implement this method to get the user's role

      if (allowedRoles.includes(userRole)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        this.adminAuthService.clear();
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
