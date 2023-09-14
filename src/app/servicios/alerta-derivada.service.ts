import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlertaDerivadaService {

  url=`${environment.backendUrl}/alertaderivada`;
  constructor(private http:HttpClient, private router:Router) { }

  getAlertaderivada(estado:string='1'):Observable<any>{
    return this.http.get(this.url, {params:{estado}});
  }

  getIdAlertaderivada(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postAlertaderivada(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putAlertaderivada(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body)
  }

  deleteAlertaderivada(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
