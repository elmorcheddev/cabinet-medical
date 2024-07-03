import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DossierMedical } from 'src/app/monClass/dossierMedical';
import { DossierMedicalService } from 'src/app/monService/DossierMedical.service';
import { Questionnaire } from 'src/app/monClass/Questionnaire';
import { QuestionnaireService } from 'src/app/monService/questionnaire.service';
import { ConsultationsService } from 'src/app/monService/Consultations.service';
import { Consultations } from 'src/app/monClass/Consultations';
import { Docteur } from 'src/app/monClass/Docteur';
import { AdminAuthService } from 'src/app/monService/admin-auth.service';
import { AdminService } from 'src/app/monService/admin.service';
import { TreatmentService } from 'src/app/monService/treatment.service';
import { Treatment } from 'src/app/monClass/Treatment';
import { InvoiceService } from 'src/app/monService/invoice.service';
import { Invoice } from 'src/app/monClass/Invoice';

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrls: ['./dossier-medical.component.css']
})
export class DossierMedicalComponent implements OnInit {
  newtreatment: string;
  invoice: Invoice ={
    id: 0,
    dateIssued: ' ',
    totalAmount: 0,
    consultation: {
      id: 0,
      dateVisit: '',
      docteur: new Docteur,
      reason: '',
      dossierMedical: new DossierMedical,
      notes: [],
      treatment: [],
      prixConsultation: 0
    },
    treatments: [],
    prixConsultation: 0
  }

  currentNote: string = '';
  newNote: string;
  listTreatment: Treatment[];
  errorMessage: string;

  addTreatment() {
    throw new Error('Method not implemented.');
  }
  addRadio() {
    throw new Error('Method not implemented.');
  }

  id: any;
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
      etat: false,
      dateNaissance: '',
      roleUtilisateurs: [],
      confirmPasswrod: ''
    }
  }
  questionnaire: Questionnaire
  activeTab: string = 'consultations';
  listConsultation: Consultations[] = [];
  newConsultation: Consultations = new Consultations();
  doctors: Docteur[] = [];
  utilisateur: any;
  idDocteur: any;

  constructor(
    private treatmentService: TreatmentService,
    private consultationsService: ConsultationsService,
    private dossierService: DossierMedicalService,
    private questionnaireService: QuestionnaireService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authAdmin: AdminAuthService,
    private adminService: AdminService,
     private invoiceService: InvoiceService) { }
 

  ngOnInit(): void {
     if (this.authAdmin.isLoggedIn() && this.authAdmin.getCurrentUser() != null) {
      this.adminService.getUserInformation().subscribe((data: any) => {
        console.log(data)
        this.utilisateur = data
        if (this.adminService.rolesMatch(['DOCTEUR'])) {
          this.idDocteur = this.utilisateur.id
        }
        else if (this.adminService.rolesMatch(['ASSISTANT']) || this.adminService.rolesMatch(['SECRITAIRE'])) {
          this.idDocteur = this.utilisateur.docteur.id
 
        }

      })
    } else {
      this.authAdmin.logout()
      this.router.navigate(['/login'])
    }
    this.id = this.activatedRoute.snapshot.params['id'];
    this.dossierService.getDossierPatient(this.id).subscribe((data: DossierMedical) => {
      if (data == null) {
        this.dossierService.createDossier(this.id, this.dossier).subscribe((data: DossierMedical) => {
          this.dossier = data;
        });
      } else {
        this.dossier = data;
        this.consultationsService.byDossierMedical(data.id).subscribe((data: Consultations[]) => {
          this.listConsultation = data;
        });
      }
    });

    if (this.activeTab === 'questionnaire') {
      this.loadQuestionnaires();
    }


  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'questionnaire') {
      this.loadQuestionnaires();
    }
  }

  loadQuestionnaires() {
    this.questionnaireService.findbydossiermedical(this.dossier.id).subscribe((data: Questionnaire) => {
      this.questionnaire = data;
      console.log(data)
    });
  }



  addNewConsultation() {
     if (this.adminService.rolesMatch(['ASSISTANT'])  ) {
      this.idDocteur = this.utilisateur.docteur.id
      this.consultationsService.ajouterConultation(this.dossier.id, this.idDocteur, this.newConsultation).subscribe((data: Consultations) => {
         const id= data.id
         this.router.navigate(['/consultation',{id}]).then(()=>{
          location.reload()
         })
      });



    }else if(this.adminService.rolesMatch(['DOCTEUR']) ){
      this.idDocteur = this.utilisateur.id
      this.consultationsService.ajouterConultation(this.dossier.id, this.idDocteur, this.newConsultation).subscribe((data: Consultations) => {
         const id= data.id
         this.router.navigate(['/consultation',{id}]).then(()=>{
          location.reload()
         })
      });
    }


  }
 goToConsultatios(id:number){
  this.router.navigate(['/consultation',{id}]) 
 }
 createInvoice(id: number): void {
  if (id) {
    this.invoiceService.createInvoice(id).subscribe(
      (data: Invoice) => {
        console.log(data);
        this.invoice = data;
        this.errorMessage = ' ';
        // Redirect to the list of generated invoices
        this.router.navigate(['/facture']);
      },
      error => {
        this.errorMessage = 'Error creating invoice';
      }
    );
  }
}

  addtretmentToConsultation(consultationId: number, treatment: string) {
    this.consultationsService.addtretmentToConsultation(consultationId, treatment).subscribe(
      updatedConsultation => {
        console.log(updatedConsultation)
        // Find the index of the updated consultation in listConsultation array
        const index = this.listConsultation.findIndex(c => c.id === updatedConsultation.id);
        if (index !== -1) {
          // Update the notes array of the consultation
          this.listConsultation[index].treatment = updatedConsultation.treatment;
        }
        // Reset the newNote field
        this.newtreatment = ''
      },
      error => {
        console.error('Error adding note:', error);
        // Handle error scenario
      }
    );
  }
  addNewMedicalHistory() {
    alert("Add new medical history logic here.");
  }

  addNewMedication() {
    alert("Add new medication logic here.");
  }

  addNewQuestionnaire() {
    alert("Add new questionnaire logic here.");
  }
  selectConsultation(id: number) {
    this.consultationsService.byIdConsultation(id).subscribe((data: Consultations) => {
      this.newConsultation = data
    })
  }
  addNote() {
    if (this.currentNote.trim()) {
      this.newConsultation.notes.push(this.currentNote.trim());
      this.currentNote = '';
    }
  }
  addNoteToConsultation(consultationId: number, note: string) {
    this.consultationsService.addNoteToConsultation(consultationId, note).subscribe(
      updatedConsultation => {
        // Find the index of the updated consultation in listConsultation array
        const index = this.listConsultation.findIndex(c => c.id === updatedConsultation.id);
        if (index !== -1) {
          // Update the notes array of the consultation
          this.listConsultation[index].notes = updatedConsultation.notes;
        }
        // Reset the newNote field
        this.newNote = '';
      },
      error => {
        console.error('Error adding note:', error);
        // Handle error scenario
      }
    );
  }

  removeNote(index: number) {
    this.newConsultation.notes.splice(index, 1);
  }
  goToQuestionnaires(idDossier: number) {
    this.router.navigate(['/questionnaires', { idDossier }]);
  }
}
