import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AdminAuthService } from '../monService/admin-auth.service';
import { AdminService } from '../monService/admin.service';
  
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router,
    private adminService: AdminService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.adminAuthService.getToken() !== null) {
      const roles = route.data['roleUtilisateurs'] as string[];
      console.log(roles);
      if (roles) {
        const match = this.adminService.rolesMatch(roles);
        if (match) {
          return true;
        } else {
          this.router.navigate(['/login']);
          this.adminAuthService.clear();
          return false;
        }
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
