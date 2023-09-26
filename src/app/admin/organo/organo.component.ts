import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resp, ResultOrgano } from 'src/app/interfaces/organo-interface';
import { ResultSede } from 'src/app/interfaces/sede-interface';
import { OrganoService } from 'src/app/servicios/organo.service';
import { SedeService } from 'src/app/servicios/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css']
})
export class OrganoComponent implements OnInit{
  listOrgano?: Resp[];
  listSede?: Array<any>;
  organoForm: FormGroup;
  organoEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;


  constructor(
    private organoService: OrganoService,
    private sedeService: SedeService,
    private fb: FormBuilder
  ){
    this.organoForm = this.fb.group({
      nombre: ['', Validators.required],
      sede: ['', Validators.required],
    });
    this.organoEditarForm = this.fb.group({
      nombre: ['', Validators.required],
      sede: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }


  mostrarOrgano(){
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.organoService.getOrgano(this.estado).subscribe(
      (data:ResultOrgano) =>{
        this.listOrgano = data.resp;
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(this.listOrgano);
      },
      (error) =>{
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(error);
      }
    )
  }

  
  mostrarSede(){
    this.sedeService.getSede().subscribe(
      (data: ResultSede) =>{
        this.listSede = data.resp;
        console.log(this.listSede);
      },
      (error) =>{
        console.log(error);
      }
    );
  }


  registrarOrgano () {
    const formData = new FormData();
    formData.append('nombre', this.organoForm.get('nombre')?.value);
    formData.append('id_sede', this.organoForm.get('sede')?.value);
    this.organoService.postOrgano(formData).subscribe({
      next:(data)=>{
        console.log(data);
        Swal.fire(
          'Registrado',
          'Se registro el organo con exito',
          'success'
        );
        this.mostrarOrgano();
        this.cancelar();
      },
      error:(error) =>{
        console.log(error);
      }
    });
  }


  editarOrgano () {
    const formData = new FormData();
    formData.append('nombre', this.organoEditarForm.get('nombre')?.value);
    formData.append('id_sede', this.organoEditarForm.get('sede')?.value);
    this.organoService.putOrgano(formData, this.ids!).subscribe({
      next: (data)=>{
        console.log(data);
        Swal.fire(
          'Editado',
          'Se edito el organo con exito',
          'success'
        );
        this.mostrarOrgano();
      },
      error:(error) =>{
        console.log(error);
      }
    });
  }

  eliminarUsuario (id:number, estado:number){
    Swal.fire({
      title:'Estas seguro?',
      text: estado===1? 'El usuario sera habilitado':'El usuario sera deshabilitado',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result)=>{
      if (result.isConfirmed) {
        this.organoService.deleteOrgano(id, estado).subscribe({
          next:(data)=>{
            this.mostrarOrgano();
            Swal.fire(
              estado===1?'Habilitado':'Deshabilitado',
              'Correcto',
              'success'
            );
            console.log(data);
          },
          error:(error)=>{
            console.log(error);
          }
        });
      }
    });
  }


  mostrarOrganoTipo(event: any){
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarOrgano();    
  }



  obtenerOrganoId (id: number) {
    this.organoService.getIdOrgano(id).subscribe({
      next: (data) =>{
        this.organoEditarForm.setValue({
          nombre: data.resp.nombre,
          sede: data.resp.id_sede,
        });
        this.ids = data.resp.id;
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }


  cancelar (){
    this.organoForm.setValue({
      nombre: '',
      sede: '',
    });
    this.organoEditarForm.setValue({
      nombre: '',
      sede: '',
    });
  }



}
