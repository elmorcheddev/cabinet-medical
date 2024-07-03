import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../monClass/Invoice';
 
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private URL = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) { }

  createInvoice(consultationId: number): Observable<Invoice> {
    //return this.http.post<Invoice>(`${this.apiUrl}/create/${consultationId}`, {});
    return this.http.post<Invoice>(`${this.URL+"/create/"+consultationId}`,{})

  }
  getInvoicesByDoctor(doctorId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.URL}/doctor/${doctorId}`);
  }
  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.URL+"/byId/"+id}`)
  }
  allInvoice(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.URL+"/all"}`)
  }
}
