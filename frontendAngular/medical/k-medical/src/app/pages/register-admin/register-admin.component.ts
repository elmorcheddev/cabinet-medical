import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Docteur } from 'src/app/monClass/Docteur';
import { Specialite } from 'src/app/monClass/Specialitet';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { SpecialiteService } from 'src/app/monService/specialite.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit{

  admin: Utilisateur={
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
  image: any;
  doctormail: any;
  constructor(private utilisateurService:UtilisateurService, 
    private authService:AdminAuthService,
    private router:Router, 
    private activeRoute:ActivatedRoute,
    private specialtyService:SpecialiteService){}  ngOnInit(): void {
 
   }
 
  
  inscriptionAdmin(form:NgForm){
    
    this.utilisateurService.inscriptionAdmin(this.admin).subscribe((data:Utilisateur)=>{
      console.log(data)
        if(data!=null){
          alert("Inscription    with Success")
          this.router.navigate(['/login'])
        }else{
          alert("there is account SUPER  ADMIN exsit")
          this.router.navigate(['/login'])

        }
    })
  }
 
   
   
}
