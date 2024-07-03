import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Assistant } from 'src/app/monClass/Assistant';
import { Docteur } from 'src/app/monClass/Docteur';
import { ResponsableStock } from 'src/app/monClass/ResponsableStock';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-responsable-stock',
  templateUrl: './responsable-stock.component.html',
  styleUrls: ['./responsable-stock.component.css']
})
export class ResponsableStockComponent implements OnInit{

   
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
  responsableStock: ResponsableStock={
    img: '',
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
  listRespo: ResponsableStock[];
   constructor(private utilisateurService:UtilisateurService, 
    private authService:AdminAuthService,
    private router:Router, 
    private activeRoute:ActivatedRoute,
    ){}  
    ngOnInit(): void {
 this.utilisateurService.listResponsable().subscribe((data:ResponsableStock[])=>{
  this.listRespo=data
  console.log(data)
 })
   }
  findById(id: number) {
    this.utilisateurService.getAssistant(id).subscribe((data:ResponsableStock)=>{
      this.responsableStock=data
    })
  }
  
  ajouterRes(form:NgForm){
    const formData = new FormData();
    formData.append('img', this.image);
     formData.append('resStock', new Blob([JSON.stringify(this.responsableStock)], { type: 'application/json' }));
    
    this.utilisateurService.ajouetrResStock(formData).subscribe((data:ResponsableStock)=>{
      console.log(data)
        if(data!=null){
          alert("Responsable  Ajouter Avec Success")
          this.router.navigate(['listresponsable']).then(()=>{
            location.reload()
          })
        }
    })
  }
  onFileSelected(event: any) {
    this.image = event.target.files[0]
   }
}
