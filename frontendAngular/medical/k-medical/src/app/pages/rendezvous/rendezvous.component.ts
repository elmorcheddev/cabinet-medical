import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Specialite } from 'src/app/monClass/Specialitet';
import { RendezVous } from 'src/app/monClass/rendezVous';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { RendezVousService } from 'src/app/monService/rendez_vous.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {


  rendezvousList: RendezVous[];
  rendezzvous: RendezVous = {
    id: 0,
    jours: '',
    heurs: '',
    etat: false,
    enattent: false,
    patient: {
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
    },
    docteur: {
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
      etat: false,
      dateNaissance: '',
      roleUtilisateurs: [],
      confirmPasswrod: ''
    }
  };
  listRendezVousDocteur: RendezVous[];
  utilisateur: any;
  nomRoles: any;
  constructor(private router: Router, private rendezvousService: RendezVousService, 
    public adminService: AdminService, private authAdmin: AdminAuthService) { }
  ngOnInit(): void {
    if (this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser() != null) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        console.log(data)
        this.utilisateur = data
        this.nomRoles = this.utilisateur.roleUtilisateurs[0].nomRoles
        if (this.adminService.rolesMatch(['DOCTEUR'])) {
          this.rendezvousService.getAllRendezVousByDocteur(this.utilisateur.id).subscribe((data: RendezVous[]) => {
            console.log(data)
            this.rendezvousList = data
          })
        }
        else if (this.adminService.rolesMatch(['ASSISTANT'] )|| this.adminService.rolesMatch(['SECRITAIRE'])) {
          this.rendezvousService.getAllRendezVousByDocteur(this.utilisateur.docteur.id).subscribe((data: RendezVous[]) => {
            this.rendezvousList = data
            console.log(data)

          })
           

        } else if (this.adminService.rolesMatch(['SUPERADMIN'])) {
          this.rendezvousService.getAllRendezVous().subscribe((data: RendezVous[]) => {
            this.rendezvousList = data
            console.log(data)
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
    updateAppoinment(form: NgForm) {

      this.rendezvousService.changeEtatRV(this.rendezzvous.id, this.rendezzvous).subscribe((data: RendezVous) => {
        console.log(data)
        if(data !== null && data.etat== true){
          alert("Rendez vous confirmer a "+data.heurs)
          this.router.navigate(['/rendezvous']).then(()=>{
            location.reload()
          })
        }
      })

    }
    findById(id: number) {
      this.rendezvousService.getById(id).subscribe((data: RendezVous) => {
        this.rendezzvous = data
      })
    }
  }
