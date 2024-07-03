import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Docteur } from 'src/app/monClass/Docteur';
import { Specialite } from 'src/app/monClass/Specialitet';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { RendezVousService } from 'src/app/monService/rendez_vous.service';
import { SpecialiteService } from 'src/app/monService/specialite.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {
  id: any;
  doctor: Docteur={
    numeroOrdre: '',
    dateCreation: '',
    img: '',
    specialite: new Specialite,
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    cin: '',
    email: '',
    password: '',
    confirmPasswrod: '',
    etat: false,
    dateNaissance: '',
    roleUtilisateurs: []
  };
  constructor(
    private datePipe: DatePipe,
    private rendezvouService: RendezVousService,
    private utilisateurService: UtilisateurService,
    private specService: SpecialiteService,
    private authAdmin: AdminAuthService,
    private adminService: AdminService,
    private activRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.activRoute.params.subscribe(params => {
      this.id = params['id'];
 this.utilisateurService.getDocteur(this.id).subscribe((data:Docteur)=>{
  this.doctor=data
 })
   
})
}
}
