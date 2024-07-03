import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { Utilisateur } from '../../monClass/utilisateur';
    import { AdminService } from '../../monService/admin.service';
 import { AdminAuthService } from '../../monService/admin-auth.service';
import { Specialite } from 'src/app/monClass/Specialitet';
import { RoleUtilisateur } from 'src/app/monClass/Roles';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  utilisateur: Utilisateur={
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    cin: '',
    email: '',
    password: '',
    etat: false,
    dateNaissance: '',
    roleUtilisateurs: [],
    confirmPasswrod: ''
  };
   nomRoles: string;
   
     constructor(public adminService:AdminService
        ,private authAdmin:AdminAuthService, private router:Router , private activatedRoute:ActivatedRoute){}

   ngOnInit() {
      
    if(this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser()!=null){
      this.adminService.getUserInformation().subscribe((data:any)=>{
        console.log(data)
       this.utilisateur=data
       this.nomRoles=this.utilisateur.roleUtilisateurs[0].nomRoles
      });}else{
        this.authAdmin.logout()
        this.router.navigate(['/login'])
      }
     
 
    
  }
  navigateTo(route: string) {
    this.router.navigate([route]).then(()=>{
     location.reload()
    });

}
 loginOrNot(){
	return this.authAdmin.isLoggedIn();
}
logout(){
  this.router.navigate(['/login'])
  return this.authAdmin.clear()
}
 
  }
 
 
 


