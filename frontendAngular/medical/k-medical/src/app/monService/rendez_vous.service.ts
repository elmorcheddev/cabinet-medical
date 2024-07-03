import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { RendezVous } from '../monClass/rendezVous';
import { Patient } from '../monClass/Patient';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  URL="http://localhost:8080/api/rendezvous"
   constructor(private http:HttpClient) { }
 
 
   public getAllRendezVous():Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(`${this.URL+"/listRendezvous"}`)
  }
  public getAllRendezVousByDocteur(id:number):Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(`${this.URL+"/findByDocteur/"+id}`)
  }
  public getAllRendezVousByDocteurConfirmer(id:number):Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.URL+"/listRendezvousConfirme/"+id}`)
  }
  public changeEtatRV(id:number,rendez_vous:RendezVous):Observable<RendezVous>{
    return this.http.post<RendezVous>(`${this.URL+"/changeEtatRendevous/"+id}`,rendez_vous)
  }
  public getById(id:number):Observable<RendezVous>{
   return  this.http.get<RendezVous>(`${this.URL+"/byId/"+id}`)
  }
  public listPatient():Observable<Patient[]>{
    return this.http.get<Patient[]>(`${this.URL+"/listPatient"}`)
  }
  public listrENDEZvOUScONFIRMER():Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(`${this.URL+"/ALLRendezvousConfirme"}`)
  }
  getRendezVousCountByDocteur(): Observable<any> {
    return this.http.get<any>(`${this.URL}/countByDocteur`);
  }
  getRendezVousCountByDate(): Observable<any> {
    return this.http.get<any>(`${this.URL}/countByDate`);
  }
}
