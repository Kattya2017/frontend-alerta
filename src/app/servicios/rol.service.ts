import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url=`${environment.backendUrl}/rol`;
  constructor(private http:HttpClient, private router:Router) { }

  getRol(estado:string='1'):Observable<any>{
    return this.http.get(this.url, {params:{estado}});
  }

  getIdRol(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  portRol(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putRol(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteRol(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
