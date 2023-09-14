import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles:[]
})
export class AdminComponent implements OnInit {

  ano = new Date().getFullYear();
  constructor() {}

  ngOnInit(): void {
    this.carga();
  }

  carga(){
    if(sessionStorage.getItem('carga')==='0'){
      location.reload();
      sessionStorage.setItem('carga', '1');
    }
  }

}
