import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { Treatment } from '../monClass/Treatment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  URL = "http://localhost:8080/api/treatment"
   constructor(private http: HttpClient) { }
  
  public addTreatment(treatment: FormData): Observable<Treatment> {

    return this.http.post<Treatment>(`${this.URL + "/addTreatment"}`, treatment)
  }
  public getAllTreatmentByCons(id:number): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.URL + "/allByCons?id="+id}`)
  }
 
 
}
