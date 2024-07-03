import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor() { }
  
  public setRoles(roles: []): void {
    localStorage.setItem("roleUtilisateurs", JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roleUtilisateurs') as string);
  }

  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }
  getUserRole(): string {
     return localStorage.getItem('roleUtilisateurs') || ''; // Example implementation
  }
  public getToken(): string {
    return localStorage.getItem('token') as string;
  }

  hasAnyRole(role: string): boolean {
    const userRoles = this.getRoles();
    return userRoles?.some(userRole => userRole === role);
  }

  clear(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roleUtilisateurs');
  }

  isLoggedIn(): boolean {
    return !!this.getRoles() && !!this.getToken();
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      const isExpired = jwtHelper.isTokenExpired(token);
      if (isExpired) {
        location.reload()
        this.logout();
        return null;
      }
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }

  logout(): void {
    this.clear();
    
  }
}
