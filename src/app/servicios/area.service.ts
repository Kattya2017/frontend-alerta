import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url = `${environment.backendUrl}/area`
  constructor(private http:HttpClient, private router:Router) { }

  getArea(estado:string='1'):Observable<any>{
    return this.http.get(this.url, {params:{estado}});
  }

  getIdArea(id:number|string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postArea(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putArea(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteArea(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
