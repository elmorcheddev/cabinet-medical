import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/monClass/Patient';
import { DossierMedical } from 'src/app/monClass/dossierMedical';
import { RendezVous } from 'src/app/monClass/rendezVous';
import { DossierMedicalService } from 'src/app/monService/DossierMedical.service';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { RendezVousService } from 'src/app/monService/rendez_vous.service';
import { UtilisateurService } from 'src/app/monService/utilisateur.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  utilisateur: any;
  nomRoles: any;
  rendezvousList: Patient[];
  dossier: DossierMedical ={
    id: 0,
    numDossier: '',
    patient:{
      assuranceMaladie: '',
      numeroSecuriteSociale: '',
      dateCreation: '',
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
    }
  } 
  listPatient: Patient[];
  constructor(private router: Router,private dossierService:DossierMedicalService, private utilisateurService:UtilisateurService,
    private rendezvousService: RendezVousService, public adminService: AdminService, private authAdmin: AdminAuthService) { }
  ngOnInit(): void {
    if (this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser() != null) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        console.log(data)
        this.utilisateur = data
        this.nomRoles = this.utilisateur.roleUtilisateurs[0].nomRoles
        if (this.adminService.rolesMatch(['DOCTEUR'])) {
          this.rendezvousService.getAllRendezVousByDocteurConfirmer(this.utilisateur.id).subscribe((data: Patient[]) => {
            console.log(data)
            this.rendezvousList = data
          })
        }
        else if (this.adminService.rolesMatch(['ASSISTANT'] )|| this.adminService.rolesMatch(['SECRITAIRE'])) {
          this.rendezvousService.getAllRendezVousByDocteurConfirmer(this.utilisateur.docteur.id).subscribe((data: Patient[]) => {
            this.rendezvousList = data
            console.log(data)

          })
           

        } else if (this.adminService.rolesMatch(['SUPERADMIN'] )){
          this.rendezvousService.listPatient().subscribe((data:Patient[])=>{
            this.listPatient=data
          })
        }else{
          this.router.navigate(['/index'])

        }
       

      })
    }else {
          this.authAdmin.logout()
          this.router.navigate(['/login'])
        }
}
goToDossierMedical(id: number) {
  this.dossierService.getDossierPatient(id).subscribe((data: DossierMedical) => {
    if (data == null) {
      this.dossierService.createDossier(id, this.dossier).subscribe((data: DossierMedical) => {
        this.dossier = data;
        const idDossier=data.id
        this.router.navigate(['/questionnaires', { idDossier }]);
      });
    } else {
      this.dossier = data;
      this.router.navigate(['/dossier',{id}])

    }
  });
}
}
