import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Ordonnances } from '../monClass/Ordonnance';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
    private URL = 'http://localhost:8080/api/ordonnances';

  constructor(private http: HttpClient) {}

  getAllOrdonnances(): Observable<Ordonnances[]> {
    return this.http.get<Ordonnances[]>(this.URL);
  }
  getAllOrdonnancesByOrd(id:number): Observable<Ordonnances[]> {
    return this.http.get<Ordonnances[]>(this.URL+"/getAllOrdonnancesByConst/"+id);
  }
  createOrdonnance(ordonnance: Ordonnances, consultationId: number): Observable<Ordonnances> {
    return this.http.post<Ordonnances>(`${this.URL}?idCosn=${consultationId}`, ordonnance);
  }

  deleteOrdonnance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
}
