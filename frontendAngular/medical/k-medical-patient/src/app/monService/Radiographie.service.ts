import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { Treatment } from '../monClass/Treatment';
import { Radiographie } from '../monClass/Radiographie';

@Injectable({
  providedIn: 'root'
})
export class RadiographieService {
  URL = "http://localhost:8080/api/radio"
   constructor(private http: HttpClient) { }
  
  public addRadio(treatment: FormData): Observable<Radiographie> {

    return this.http.post<Radiographie>(`${this.URL + "/addRadio"}`, treatment)
  }
  public getAllRadioByCons(id:number): Observable<Radiographie[]> {
    return this.http.get<Radiographie[]>(`${this.URL + "/allByCons?id="+id}`)
  }
 
 
}
