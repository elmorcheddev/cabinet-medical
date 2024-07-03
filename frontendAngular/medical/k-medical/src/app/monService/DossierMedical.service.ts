import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { RendezVous } from '../monClass/rendezVous';
import { DossierMedical } from '../monClass/dossierMedical';

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {
  URL="http://localhost:8080/api/dossier"
   constructor(private http:HttpClient) { }
 
 
   public getDossierPatient(id:number):Observable<DossierMedical>{
    return this.http.get<DossierMedical>(`${this.URL+"/byPatient/"+id}`)
  }
  public createDossier(id:number , dossier:DossierMedical):Observable<DossierMedical>{
    return this.http.post<DossierMedical>(`${this.URL+"/addDossier?idPatient="+id}`,dossier)
  }
 
  
 
}
