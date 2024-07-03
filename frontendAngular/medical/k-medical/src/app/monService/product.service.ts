import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../monClass/utilisateur';
import { Specialite } from '../monClass/Specialitet';
import { RendezVous } from '../monClass/rendezVous';
import { DossierMedical } from '../monClass/dossierMedical';
import { CategoriesProduit } from '../monClass/CategoriesProduit';
import { Product } from '../monClass/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  URL="http://localhost:8080/api/catAndProduct"
   constructor(private http:HttpClient) { }
 
 
   public getListCategories():Observable<CategoriesProduit[]>{
    return this.http.get<CategoriesProduit[]>(`${this.URL+"/listCat"}`)
  }
  
  public byIdCat(id:number):Observable<CategoriesProduit>{
    return this.http.get<CategoriesProduit>(`${this.URL+"/byIdCat/"+id}`)
  }
  public getListProduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.URL+"/listProduct"}`)
  }
  public addnewCategoreis(cat:CategoriesProduit):Observable<CategoriesProduit>{
    return this.http.post<CategoriesProduit>(`${this.URL+"/addNewCategories"}`,cat)
  }
  updateCategory(cat: CategoriesProduit): Observable<CategoriesProduit> {
    return this.http.put<CategoriesProduit>(`${this.URL}/updateCategory`, cat);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/categories/${id}`);
  }
  
  public getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/list`);
  }

  public addNewProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.URL}/add`, product);
  }

  public updateProduct(product: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/update`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/delete/${id}`);
  }
 
}
