import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { RendezVous } from '../monClass/rendezVous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  URL="http://localhost:8080/api/rendezvous"
   constructor(private http:HttpClient) { }
 
 
   public getAllRendezVousByPatient(id:number):Observable<RendezVous[]>{
    return this.http.get<RendezVous[]>(`${this.URL+"/findByPatient/"+id}`)
  }
 public envoyerRendezvous(rendezvous:FormData):Observable<RendezVous>{
  return this.http.post<RendezVous>(`${this.URL+"/envoyerRendezVous"}`,rendezvous)
 }
 public numberRendeInDay(day:string):Observable<number>{
  return this.http.get<number>(`${this.URL+"/numberRendezIndAY"}`)
}
}
