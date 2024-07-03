import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Questionnaire } from '../monClass/Questionnaire';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private URL = "http://localhost:8080/api/questionnaire";

  constructor(private http: HttpClient) { }

  findbydossiermedical(id: number): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.URL+"/findbydossiermedical/"+id}`);
  }

  saveQuestionnaire(id:number ,questionnaire: Questionnaire): Observable<Questionnaire> {
    return this.http.post<Questionnaire>(`${this.URL+"/newQuestionnaire?idDossier="+id}`, questionnaire);
  }
}
