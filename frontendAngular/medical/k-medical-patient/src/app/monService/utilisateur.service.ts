import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Docteur } from '../monClass/Docteur';
import { Assistant } from '../monClass/Assistant';
import { Secretaire } from '../monClass/Secretaire';
import { Patient } from '../monClass/Patient';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  URL="http://localhost:8080/api/utilisateur"
  constructor(private http:HttpClient) { }
 
  public getDocteur(id:number):Observable<Docteur>{
    return this.http.get<Docteur>(`${this.URL+"/byId/"+id}`)
  }
  
  public getPatient(id:number):Observable<Patient>{
    return this.http.get<Patient>(`${this.URL+"/byId/"+id}`)
  }
  public listDocteur():Observable<Docteur[]>{
    return this.http.get<Docteur[]>(`${this.URL+"/listdocteurPatient"}`)
  }
 
  public listAssitant():Observable<Assistant[]>{
    return this.http.get<Assistant[]>(`${this.URL+"/listAssistant"}`)
  }
 
  public ajouterPatient(patient:FormData):Observable<Patient>{
    return this.http.post<Patient>(`${this.URL+"/inscriptionPatient"}`,patient)
  }
  public listDocteurBySecialite(id:number):Observable<Docteur[]>{
    return this.http.get<Docteur[]>(`${this.URL+"/findBySpecialite/"+id}`)
  }
}
