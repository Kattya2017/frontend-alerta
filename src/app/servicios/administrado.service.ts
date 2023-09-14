import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdministradoService {

  url = `${environment.backendUrl}/administrado`
  constructor(private http:HttpClient, private router:Router) { }

  getAdministrado(){}

  getIdAdministrado(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postAdministrado(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putAdministrado(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  dleteAdministrado(){}

}
