import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  url=`${environment.backendUrl}/sede`
  constructor(private http:HttpClient, private router:Router) { }

  getSede(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }

  getIdSede(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postSede(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putSede(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteSede(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
