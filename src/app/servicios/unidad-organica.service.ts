import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UnidadOrganicaService {

  url=`${environment.backendUrl}/unidadorganica`
  constructor(private http:HttpClient, private router:Router) { }

  getUnidadorganica(estado:string='1'):Observable<any>{
    return this.http.get(this.url, {params:{estado}});
  }

  getIdUnidadorganica(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postUnidadorganica(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putUnidadorganica(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body)
  }

  deleteUnidadorganica(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
