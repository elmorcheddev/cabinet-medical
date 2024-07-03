import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 import { Utilisateur } from '../../monClass/utilisateur';
    import { AdminService } from '../../monService/admin.service';
 import { AdminAuthService } from '../../monService/admin-auth.service';
import { Specialite } from 'src/app/monClass/Specialitet';
import { RoleUtilisateur } from 'src/app/monClass/Roles';
import { Patient } from 'src/app/monClass/Patient';
import { SpecialiteService } from 'src/app/monService/specialite.service';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  utilisateur: Patient={
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
    assuranceMaladie: '',
    numeroSecuriteSociale: '',
    dateCreation: '',
    img: '',
    confirmPasswrod: ''
  };
   nomRoles: string;
  listSpec: Specialite[];
  user: any;
   
     constructor(private adminService:AdminService , private specService:SpecialiteService
        ,private authAdmin:AdminAuthService, private router:Router , private activatedRoute:ActivatedRoute){}

   ngOnInit() {
   
         if(this.authAdmin.isLoggedIn() ){
          this.adminService.getUserInformation().subscribe((data:any)=>{
            console.log(data)
           this.utilisateur=data
           this.nomRoles=this.utilisateur.roleUtilisateurs[0].nomRoles
          });}
          this.specService.getAllSpec().subscribe((data:Specialite[])=>{
            this.listSpec=data
          })
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
getDocteur(id: number) {
  this.router.navigate(['/listdocteurbycat',{id}])
   }
  }
 
 
 


