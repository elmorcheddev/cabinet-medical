import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  URL = "http://localhost:8080/api/spec"
  jsonUrl = "/assets/json/specializations_list.json"
  constructor(private http: HttpClient) { }
  getListFromJsonfil(): Observable<any[]> {
    return this.http.get<any[]>(`${this.jsonUrl}`)
  }
  public ajouterSpec(spec: FormData): Observable<Specialite> {

    return this.http.post<Specialite>(`${this.URL + "/ajouterSpec"}`, spec)
  }
  public getAllSpec(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${this.URL + "/all"}`)
  }
public getByIdSpecialite(id:number):Observable<Specialite>{
  return this.http.get<Specialite>(`${this.URL+"/byId/"+id}`)
}
public updateSpecialite(id: number, specialite: FormData): Observable<Specialite> {
  return this.http.put<Specialite>(`${this.URL + "/updateSpecialite/" + id}`, specialite);
}
}
