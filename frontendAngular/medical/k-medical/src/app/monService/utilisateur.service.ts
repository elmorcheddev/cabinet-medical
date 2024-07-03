import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Docteur } from '../monClass/Docteur';
import { Assistant } from '../monClass/Assistant';
import { Secretaire } from '../monClass/Secretaire';
import { Patient } from '../monClass/Patient';
import { ResponsableStock } from '../monClass/ResponsableStock';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
 
  URL="http://localhost:8080/api/utilisateur"
  constructor(private http:HttpClient) { }
 
  public getDocteur(id:number):Observable<Docteur>{
    return this.http.get<Docteur>(`${this.URL+"/byId/"+id}`)
  }
  public getAssistant(id:number):Observable<Assistant>{
    return this.http.get<Assistant>(`${this.URL+"/byId/"+id}`)
  }
  inscriptionAdmin(admin: Utilisateur) :Observable<Utilisateur>{
    return this.http.post<Utilisateur>(`${this.URL+"/ajouterSuperAdmin"}`, admin)

   }
  public ajouetrDocteur(doc:FormData):Observable<Docteur>{
    return this.http.post<Docteur>(`${this.URL+"/ajouterDocteur"}`, doc)
  }
  public listDocteur():Observable<Docteur[]>{
    return this.http.get<Docteur[]>(`${this.URL+"/listdocteur"}`)
  }
  public ajouetrAssitant(ass:FormData):Observable<Assistant>{
    return this.http.post<Assistant>(`${this.URL+"/ajouterAssitant"}`, ass)
  }
  public listAssitant():Observable<Assistant[]>{
    return this.http.get<Assistant[]>(`${this.URL+"/listAssistant"}`)
  }
  public ajouetrSecretaire(sec:FormData):Observable<Secretaire>{
    return this.http.post<Secretaire>(`${this.URL+"/ajouterSecritaire"}`, sec)
  }
  public ajouetrResStock(res:FormData):Observable<ResponsableStock>{
    return this.http.post<ResponsableStock>(`${this.URL+"/ajouterResponsableStock"}`, res)
  }
  public listSecretaire():Observable<Secretaire[]>{
    return this.http.get<Secretaire[]>(`${this.URL+"/listScretaire"}`)
  }
  public listResponsable():Observable<ResponsableStock[]>{
    return this.http.get<ResponsableStock[]>(`${this.URL+"/listResponsableStock"}`)
  }
  getPatientCountByDate(): Observable<any> {
    return this.http.get<any>(`${this.URL}/patientcountByDate`);
}
}
