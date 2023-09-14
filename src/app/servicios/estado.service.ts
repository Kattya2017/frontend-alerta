import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  url=`${environment.backendUrl}/estado`;
  constructor(private http:HttpClient, private router:Router) { }

  getEstado(){}

  getIdEstado(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postEstado(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putEstado(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteEstado(){}

}
