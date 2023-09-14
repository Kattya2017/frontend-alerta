import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DniService {

  url=`${environment.backendUrl}/dni`
  constructor(private http:HttpClient, private router:Router) { }

  getDni(){}

  getIdDni(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postDni(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putDni(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteDni(){}

}
