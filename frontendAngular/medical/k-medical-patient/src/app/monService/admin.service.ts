import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { AdminAuthService } from './admin-auth.service';
import { Utilisateur } from '../monClass/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
PATH_APP="http://localhost:8080/auth"
  constructor(private httpClient:HttpClient,private adminAuthService:AdminAuthService) { }
  requestHeader = new HttpHeaders({
	   
		   "No-Auth":"True" 
	   }
  )
  public loginAdmin(loginData:any){
	  return this.httpClient.post<any>(`${this.PATH_APP+"/login"}`,loginData,{headers:this.requestHeader})
  }
 

  getUserInformation(): Observable<any> {
    const token = this.adminAuthService.getToken(); // Get token from storage or service

    if (!token) {
      throw new Error('No authentication token found');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.httpClient.get<any>(this.PATH_APP+"/getConnectedUser", { headers });
  }
  public rolesMatch(allowedRoles:any):boolean{
	 let isMatch=false;
	 const adminRoles:any=this.adminAuthService.getRoles();
	 if(adminRoles != null && adminRoles){
		 for(let i=0 ; i<adminRoles.length; i++){
			 for(let j=0;j<allowedRoles.length;j++){
				if(adminRoles[i].nomRoles === allowedRoles[j]){
					 isMatch=true;
				 return isMatch;
				}else{
					return isMatch;
				}
				
			 }
		 }
		 
	 }
	 return isMatch;
	 }
	  
 public getUser(email:string):Observable<Utilisateur>{
	   return this.httpClient.get<Utilisateur>(`${this.PATH_APP+"/findbyEmail/"+email}`)
   }
 getUserInfo(): Observable<Utilisateur> {
    const token = this.adminAuthService.getToken();   
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Utilisateur>(`${this.PATH_APP+"/user-info"}`, { headers });
  }
}
