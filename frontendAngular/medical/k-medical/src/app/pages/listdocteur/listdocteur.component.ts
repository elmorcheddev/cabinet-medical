import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Docteur } from 'src/app/monClass/Docteur';
import { Specialite } from 'src/app/monClass/Specialitet';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { SpecialiteService } from 'src/app/monService/specialite.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-listdocteur',
  templateUrl: './listdocteur.component.html',
  styleUrls: ['./listdocteur.component.css']
})
export class ListdocteurComponent implements OnInit{

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
  doctormail: any;
  constructor(private utilisateurService:UtilisateurService, 
    private authService:AdminAuthService,
    private router:Router, 
    private activeRoute:ActivatedRoute,
    private specialtyService:SpecialiteService){}  ngOnInit(): void {
 this.utilisateurService.listDocteur().subscribe((data:Docteur[])=>{
  this.listDoc=data
  console.log(data)
 })
 this.getAllSpec()
  }
  findById(id: number) {
    this.utilisateurService.getDocteur(id).subscribe((data:Docteur)=>{
      this.doc=data
    })
  }
  getAllSpec(){
    this.specialtyService.getAllSpec().subscribe((data:Specialite[])=>{
      this.listSpec=data
    })
  }
  ajouterDocteur(form:NgForm){
    const formData = new FormData();
    formData.append('img', this.image);
     formData.append('docteur', new Blob([JSON.stringify(this.doc)], { type: 'application/json' }));
    
    this.utilisateurService.ajouetrDocteur(formData).subscribe((data:Docteur)=>{
      console.log(data)
        if(data!=null){
          alert("Docteur Ajouter Avec Success")
          this.router.navigate(['listdocteur']).then(()=>{
            location.reload()
          })
        }
    })
  }
  onFileSelected(event: any) {
    this.image = event.target.files[0]
   }
   applyFilter() {
    if (!this.doctormail) {
      return this.listDoc;
    }
    return this.listDoc.filter(doc =>
      doc.email.toLowerCase().includes(this.doctormail.toLowerCase())
    );
  }
   
}
