import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/monClass/Patient';
import { Questionnaire } from 'src/app/monClass/Questionnaire';
import { QuestionnaireService } from 'src/app/monService/questionnaire.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {

  id: number;
  questionnaire: Questionnaire = {
    id: 0,
    tuberculose: false,
    diabete: false,
    cardiopathie: false,
    autres: false,
    numQuestionnaires: '',
    mutuelle: false,
    cmu: false,
    referent: '',
     pathologies:  []
   ,
    interventionChirurgicale: false,
    interventionDetails: '',
    medicaments: false,
    medicamentsDetails: '',
    anticoagulants: false,
    biphosphonates: false,
    dossierMedical: {
      id: 0,
      numDossier: '',
      patient: new Patient
    },
    autresPathologies: '',
    allergieConnue: '',
    allergieDentaire: '',
    mutuelleAutre: '',
    profession: '',
    adressePar: '',
    medecinNom: '',
    lieu: '',
    enfants: 0,
    fume: false,
    alcool: false
  };

  constructor(private questionService: QuestionnaireService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['idDossier'];
    this.questionService.findbydossiermedical(this.id).subscribe((data: Questionnaire) => {
      console.log(data);
      if (data == null ) {
         this.questionService.saveQuestionnaire(this.id, this.questionnaire).subscribe((data: Questionnaire) => {
            console.log(data);
            this.questionnaire = data;
         }); 
      } else {
        this.questionnaire = data;
      }
    });
  }

  saveQuestionnaire(form: any): void {
    this.questionService.saveQuestionnaire(this.id ,this.questionnaire).subscribe(
      response => {
        if(response!= null){
          const id = response.dossierMedical.patient.id
          alert("Questionnaire is responded ")
                    this.router.navigate(['/dossier',{id}])
        }
        },
      error => {
        console.error("Error saving questionnaire:", error);
       }
    );
  }
 
  

}
