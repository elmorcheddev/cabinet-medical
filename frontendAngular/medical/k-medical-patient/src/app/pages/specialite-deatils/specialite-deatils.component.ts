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
  selector: 'app-specialite-deatils',
  templateUrl: './specialite-deatils.component.html',
  styleUrls: ['./specialite-deatils.component.css']
})
export class SpecialiteDeatilsComponent implements OnInit {
  id: number;
  listSpec: Specialite[];
  selectedSpec: Specialite ={
    id: 0,
    nomSpecialite: '',
    createBy: {
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
    },
    img: '',
    description: ''
  };
  listDocteur: Docteur[];
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
this.specService.getByIdSpecialite(this.id).subscribe((data:Specialite)=>{
  console.log(data)
  this.selectedSpec=data
  this.utilisateurService.listDocteurBySecialite(this.selectedSpec.id).subscribe((data: Docteur[]) => {
    this.listDocteur = data;
    console.log(data);
  });
})
   })
   this.specService.getAllSpec().subscribe((data:Specialite[])=>{
    this.listSpec=data
   })
}
learnMore(id: number) {
  this.router.navigate(['/specialiteDetails',{id}])
  }
}
