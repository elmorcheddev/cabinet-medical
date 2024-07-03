import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Consultations } from 'src/app/monClass/Consultations';
import { Patient } from 'src/app/monClass/Patient';
import { Questionnaire } from 'src/app/monClass/Questionnaire';
import { Treatment } from 'src/app/monClass/Treatment';
import { DossierMedical } from 'src/app/monClass/dossierMedical';
import { ConsultationsService } from 'src/app/monService/Consultations.service';
import { DossierMedicalService } from 'src/app/monService/DossierMedical.service';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { QuestionnaireService } from 'src/app/monService/questionnaire.service';
import { TreatmentService } from 'src/app/monService/treatment.service';

@Component({
  selector: 'app-medical-folder',
  templateUrl: './medical-folder.component.html',
  styleUrls: ['./medical-folder.component.css']
})
export class MedicalFolderComponent implements OnInit {
  utilisateur: Patient = {
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
    confirmPasswrod: '',
    etat: false,
    dateNaissance: '',
    roleUtilisateurs: []
  };
  dossier: DossierMedical = {
    id: 0,
    numDossier: '',
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
      confirmPasswrod: '',
      etat: false,
      dateNaissance: '',
      roleUtilisateurs: []
    }
  };
  listConst: Consultations[];
  questionnaire: Questionnaire;
  activeTab: string;
  showTreatments: boolean = false;
  showRadiographs: boolean = false;
  showPrescriptions: boolean = false;
  showNotes: boolean = false;
  listTreatment: Treatment[];

  constructor(
    private treatmentService: TreatmentService,
    private consultationsService: ConsultationsService,
    private dossierService: DossierMedicalService,
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authAdmin: AdminAuthService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    if (this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser() != null) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        this.utilisateur = data;
        if (this.adminService.rolesMatch(['PATIENT'])) {
          this.dossierService.getDossierPatient(this.utilisateur.id).subscribe((data: DossierMedical) => {
            this.dossier = data;
            this.consultationsService.byDossierMedical(this.dossier.id).subscribe((data: Consultations[]) => {
              console.log(data)
              this.listConst = data;
            });
            this.questionnaireService.findbydossiermedical(this.dossier.id).subscribe((data: Questionnaire) => {
              this.questionnaire = data;
            });
          });
        }
      });
    } else {
      this.authAdmin.logout();
      this.router.navigate(['/login']);
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'questionnaire') {
      this.questionnaireService.findbydossiermedical(this.dossier.id).subscribe((data: Questionnaire) => {
        this.questionnaire = data;
      });
    }
  }

  

  
}
