import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  url=`${environment.backendUrl}/alerta`;
  constructor(private http:HttpClient, private router:Router) { }

  getAlerta(){}

  getIdAlerta(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postAlerta(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putAlerta(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteAlerta(){}

}
