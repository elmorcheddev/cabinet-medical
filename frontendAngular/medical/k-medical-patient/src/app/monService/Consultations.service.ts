import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { RendezVous } from '../monClass/rendezVous';
import { DossierMedical } from '../monClass/dossierMedical';
import { Consultations } from '../monClass/Consultations';

@Injectable({
  providedIn: 'root'
})
export class ConsultationsService {
  URL="http://localhost:8080/api/consultation"
   constructor(private http:HttpClient) { }
 
 
   public byDossierMedical(id:number):Observable<Consultations[]>{
    return this.http.get<Consultations[]>(`${this.URL+"/byDossierMedical/"+id}`)
  }
  addNoteToConsultation(consultationId: number, note: string): Observable<Consultations> {
     return this.http.post<Consultations>(`${this.URL+"/"+consultationId+"/add-note"}`, note);
  }
  addtretmentToConsultation(consultationId: number, treatment: string): Observable<Consultations> {
    return this.http.post<Consultations>(`${this.URL+"/"+consultationId+"/add-teatement"}`, treatment);
 }
  public byIdConsultation(id:number):Observable<Consultations>{
    return this.http.get<Consultations>(`${this.URL+"/byId/"+id}`)
  }
  public ajouterConultation(idDossier:number, idDocteur:number , cosnultation:Consultations):Observable<Consultations>{
    return this.http.post<Consultations>(`${this.URL+"/ajouterConultation?idDossier="+idDossier+"&idDocteur="+idDocteur}`,cosnultation)
  }
 
  
 
}
