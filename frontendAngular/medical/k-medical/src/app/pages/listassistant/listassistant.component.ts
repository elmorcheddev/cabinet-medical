import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Assistant } from 'src/app/monClass/Assistant';
import { Docteur } from 'src/app/monClass/Docteur';
import { Specialite } from 'src/app/monClass/Specialitet';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { SpecialiteService } from 'src/app/monService/specialite.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-listassistant',
  templateUrl: './listassistant.component.html',
  styleUrls: ['./listassistant.component.css']
})
export class ListassistantComponent implements OnInit{

  listDoc: Docteur[];
  listSpec: Specialite[];
  doc: Docteur={
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
    specialite: new Specialite,
    roleUtilisateurs: [],
    numeroOrdre: '',
    dateCreation: '',
    img: '',
    confirmPasswrod: ''
  };
  image: any;
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
  assistant: Assistant={
    dateCreation: "",
    img: "",
    docteur: new Docteur,
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
  listAss: Assistant[];
  constructor(private utilisateurService:UtilisateurService, 
    private authService:AdminAuthService,
    private router:Router, 
    private activeRoute:ActivatedRoute,
    private specialtyService:SpecialiteService){}  
    ngOnInit(): void {
 this.utilisateurService.listAssitant().subscribe((data:Assistant[])=>{
  this.listAss=data
  console.log(data)
 })
 this.getAllSpec()
  }
  findById(id: number) {
    this.utilisateurService.getAssistant(id).subscribe((data:Assistant)=>{
      this.assistant=data
    })
  }
  getAllSpec(){
    this.utilisateurService.listDocteur().subscribe((data:Docteur[])=>{
      this.listDoc=data
    })
  }
  ajouterAssistant(form:NgForm){
    const formData = new FormData();
    formData.append('img', this.image);
     formData.append('assistant', new Blob([JSON.stringify(this.assistant)], { type: 'application/json' }));
    
    this.utilisateurService.ajouetrAssitant(formData).subscribe((data:Assistant)=>{
      console.log(data)
        if(data!=null){
          alert("Docteur Ajouter Avec Success")
          this.router.navigate(['listassitant']).then(()=>{
            location.reload()
          })
        }
    })
  }
  onFileSelected(event: any) {
    this.image = event.target.files[0]
   }
}
