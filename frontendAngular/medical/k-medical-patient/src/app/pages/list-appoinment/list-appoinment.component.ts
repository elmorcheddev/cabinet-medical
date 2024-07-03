import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specialite } from 'src/app/monClass/Specialitet';
import { RendezVous } from 'src/app/monClass/rendezVous';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { RendezVousService } from 'src/app/monService/rendez_vous.service';

@Component({
  selector: 'app-list-appoinment',
  templateUrl: './list-appoinment.component.html',
  styleUrls: ['./list-appoinment.component.css']
})
export class ListAppoinmentComponent implements OnInit {

  rendezvousList: RendezVous[];
  utilisateur: any;
  nomRoles: any;

  constructor(private router: Router, private rendezvousService: RendezVousService, 
    public adminService: AdminService, private authAdmin: AdminAuthService) { }

  ngOnInit(): void {
    if (this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser() != null) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        this.utilisateur = data;
        this.nomRoles = this.utilisateur.roleUtilisateurs[0].nomRoles;
        this.rendezvousService.getAllRendezVousByPatient(this.utilisateur.id).subscribe((data: RendezVous[]) => {
          this.rendezvousList = data;
        });
      });
    }
  }
}
