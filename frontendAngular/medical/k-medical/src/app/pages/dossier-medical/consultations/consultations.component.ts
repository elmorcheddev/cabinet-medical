import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Consultations } from 'src/app/monClass/Consultations';
import { Docteur } from 'src/app/monClass/Docteur';
import { Patient } from 'src/app/monClass/Patient';
import { Radiographie } from 'src/app/monClass/Radiographie';
import { Treatment } from 'src/app/monClass/Treatment';
import { Utilisateur } from 'src/app/monClass/utilisateur';
import { ConsultationsService } from 'src/app/monService/Consultations.service';
import { DossierMedicalService } from 'src/app/monService/DossierMedical.service';
import { RadiographieService } from 'src/app/monService/Radiographie.service';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { QuestionnaireService } from 'src/app/monService/questionnaire.service';
import { TreatmentService } from 'src/app/monService/treatment.service';
import { OrdonnanceService } from 'src/app/monService/ordonnance.service';  // Import OrdonnanceService
import { Ordonnances } from 'src/app/monClass/Ordonnance';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
  newNote: any;
  newOrdonnance: string = '';
  consultation: Consultations = {
    id: 0,
    dateVisit: '',
    docteur: {
      numeroOrdre: '',
      dateCreation: '',
      img: '',
      specialite: {
        id: 0,
        nomSpecialite: '',
        createBy: new Utilisateur(),
        img: '',
        description: ''
      },
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
    reason: '',
    dossierMedical: {
      id: 0,
      numDossier: '',
      patient: new Patient()
    },
    notes: [],
    treatment: [],
    prixConsultation: 0
  };
  id: any;
  listTreatment: Treatment[];
  treatment: Treatment = {
    id: 0,
    operation: '',
    prixOperation: 0,
    consultations: new Consultations()
  };
  listRadio: Radiographie[];
  img: string | Blob;
    ordonnance:Ordonnances = {
      id: 0,
      dateOrdonnance: '',
      details: '',
      consultation: new Consultations
    };
  ord: Ordonnances[];
  constructor(
    private treatmentService: TreatmentService,
    private consultationsService: ConsultationsService,
    private dossierService: DossierMedicalService,
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private radioService: RadiographieService,
    private activatedRoute: ActivatedRoute,
    private authAdmin: AdminAuthService,
    private adminService: AdminService,
    private ordonnanceService: OrdonnanceService  // Inject OrdonnanceService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.listTreatmetByCons();
    this.listRadioByCons();
    this.consultationsService.byIdConsultation(this.id).subscribe((data: Consultations) => {
      this.consultation = data;
      this.ordonnanceService.getAllOrdonnancesByOrd(data.id).subscribe((data:Ordonnances[])=>{
        this.ord=data
      })
   
      console.log(data);
    });
  }

  listTreatmetByCons() {
    this.treatmentService.getAllTreatmentByCons(this.id).subscribe((data: Treatment[]) => {
      this.listTreatment = data;
      console.log(data);
    });
  }

  listRadioByCons() {
    this.radioService.getAllRadioByCons(this.id).subscribe((data: Radiographie[]) => {
      this.listRadio = data;
      console.log(data);
    });
  }

  addNoteToConsultation(consultationId: number, note: string) {
    this.consultationsService.addNoteToConsultation(consultationId, note).subscribe(
      updatedConsultation => {
        this.consultation.notes = updatedConsultation.notes;
        this.newNote = '';  // Reset the newNote field
      }
    );
  }

  addTreatmentToConsultation(form: NgForm) {
    const formData = new FormData();
    formData.append('treatment', new Blob([JSON.stringify(this.treatment)], { type: 'application/json' }));
    formData.append('idCons', this.id);
    this.treatmentService.addTreatment(formData).subscribe(
      (data: Treatment) => {
        console.log(data);
        form.resetForm();
        this.listTreatmetByCons();
      }
    );
  }

  goToMedicalFolder() {
    const id = this.consultation.dossierMedical.id;
    this.router.navigate(['/dossier', { id }]);
  }

  addRadio(form: NgForm) {
    const formData = new FormData();
    formData.append('radio', new Blob([JSON.stringify(this.treatment)], { type: 'application/json' }));
    formData.append('idCons', this.id);
    formData.append('img', this.img);
    this.radioService.addRadio(formData).subscribe(
      (data: Radiographie) => {
        console.log(data);
        form.resetForm();
        this.listTreatmetByCons();
      }
    );
  }

  selectConsultation(arg0: any) {
    throw new Error('Method not implemented.');
  }

  selectTedFile(event: any) {
    this.img = event.target.files[0];
    console.log(event.target.files[0]);
  }

  addOrdonnance(form: NgForm) {
   

    this.ordonnanceService.createOrdonnance(this.ordonnance,this.id ).subscribe(
      (data) => {
        console.log(data);
        form.resetForm();
      },
      (error) => {
        console.error('Error creating ordonnance', error);
      }
    );
  }
}
