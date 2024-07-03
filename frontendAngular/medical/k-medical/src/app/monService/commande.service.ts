import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Commande } from '../monClass/commande';
 
@Injectable({
  providedIn: 'root'
})
export class CommandeService {
	PATH_APP= "http://localhost:8080/pfe/commande/"
  constructor(private httpClient:HttpClient) { }
  public getAllCommande():Observable<Commande[]>{
	  return this.httpClient.get<Commande[]>(`${this.PATH_APP+"all"}`)
  }
  public getAllCommandeByAssitant(id:number):Observable<Commande[]>{
	  return this.httpClient.get<Commande[]>(`${this.PATH_APP+"byIdAssitant/"+id}`)
  }
   public getCommande(id:number):Observable<Commande>{
	  return this.httpClient.get<Commande>(`${this.PATH_APP+"byId/"+id}`)
  }
    public deleteCommande(id:number) {
	  return this.httpClient.delete(`${this.PATH_APP+"delete/"+id}`)
  }
    public saveCommande(commande:Commande , idAssiatnt:number):Observable<Commande> {
	  return this.httpClient.post<Commande>(`${this.PATH_APP+"save?idAssiatnt="+idAssiatnt}`,commande)
  }
  }