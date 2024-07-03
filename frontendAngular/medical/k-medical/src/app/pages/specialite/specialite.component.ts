import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Specialite } from 'src/app/monClass/Specialitet';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { SpecialiteService } from 'src/app/monService/specialite.service';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {

  specialte: Specialite = {
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

  listSpec: Specialite[];
  idAdmin: number;
  utilisateur: Utilisateur = {
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
  json: any;
  image: any;

  constructor(
    private specialteService: SpecialiteService,
    private router: Router,
    private authAdmin: AdminAuthService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    if (this.authAdmin.isLoggedIn()) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        this.utilisateur = data;
      });
    } else {
      this.router.navigate(['/login']);
    }
    this.specialteService.getListFromJsonfil().subscribe((data: any[]) => {
      this.json = data;
    });
     if (this.adminService.rolesMatch(['SUPERADMIN'])){
       this.specialteService.getAllSpec().subscribe((data: Specialite[]) => {
      this.listSpec = data;
    });
     }else{
      this.router.navigate(['/index'])
     }
   
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }

  ajouterSpecialite(form: NgForm): void {
    const formData = new FormData();
    formData.append('img', this.image);
    formData.append('idAdmin', this.utilisateur.id.toString());
    formData.append('specialite', new Blob([JSON.stringify(this.specialte)], { type: 'application/json' }));
    this.specialteService.ajouterSpec(formData)
      .subscribe((response: Specialite) => {
        if (response !== null) {
          alert("Specialite a ete ajouter avec success");
          this.router.navigate(['/specialite']).then(() => {
            location.reload();
          });
        } else {
          alert("Specialite exist deja");
        }
      },
        error => {
          console.error('Erreur lors de l\'ajout de la spécialité', error);
        }
      );
  }

  getSpecialite(id: number) {
    this.specialteService.getByIdSpecialite(id).subscribe((data: Specialite) => {
      this.specialte = data;
    });
  }

  updateSpecialite(form: NgForm): void {
    if (this.specialte.id) {
      const formData = new FormData();
      formData.append('img', this.image);
      formData.append('idAdmin', this.utilisateur.id.toString());
      formData.append('specialite', new Blob([JSON.stringify(this.specialte)], { type: 'application/json' }));
      this.specialteService.updateSpecialite(this.specialte.id, formData)
        .subscribe((response: Specialite) => {
          alert("Specialite a ete mis à jour avec succès");
          this.router.navigate(['/specialite']).then(() => {
            location.reload();
          });
        },
          error => {
            console.error('Erreur lors de la mise à jour de la spécialité', error);
          }
        );
    }
  }
}
