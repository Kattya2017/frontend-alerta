import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resp } from 'src/app/interfaces/sede-interface';
import { SedeService } from 'src/app/servicios/sede.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit{
  listSede?:Array<Resp>;
  sedeForm: FormGroup;
  sedeEditarForm: FormGroup;
  ids?: string | number;
  estado: string='1';
  carga:boolean=false;
  p: number=1;


  constructor (private sedeService:SedeService, private fb:FormBuilder){
    this.sedeForm = this.fb.group({
      nombre: ['',Validators.required],
    });
    this.sedeEditarForm =  this.fb.group({
      nombre: ['', Validators.required],
    });
  }


ngOnInit(): void {
  this.mostrarSede();
}


mostrarSede () {
  this.carga = true;
  if(this.carga){
    Swal.fire({
      title: 'Cargando datos!',
      html: ' Por favor espere',
      timer: 1500,
      timerProgressBar: true,
      didOpen: () =>{
        Swal.showLoading();
      },
    });
  }
  this.sedeService.getSede(this.estado).subscribe({
    next:(data)=>{
      this.listSede = data.resp;
      console.log(this.listSede);
      this.carga = false;
      if(!this.carga){
        Swal.close();
      }
    },
    error:(error)=>{
      this.carga = false;
      if(!this.carga){
        Swal.close();
      }
      console.log(error);  
    }
  });
}


registrarSede () {
  const formData = new FormData();
  formData.append('nombre', this.sedeForm.get('nombre')?.value);
  this.sedeService.postSede(formData).subscribe({
    next:(data)=>{
      console.log(data);
      Swal.fire('Registrado!', 'Se registro la sede con exito', 'success')
      this.mostrarSede();
      this.cancelar();
    },
    error:(error) => {
      console.log(error);
    }
  });
}


editarSede(){
  const formData = new FormData();
  formData.append('nombre', this.sedeEditarForm.get('nombre')?.value);
  this.sedeService.putSede(formData, this.ids!).subscribe({
    next:(data)=>{
      console.log(data);
      Swal.fire(
        'Editado!',
        'La sede se edito con exito',
        'success'
      );
      this.mostrarSede();
    },
    error:(error)=>{
      console.log(error);
    }
  })
}


eliminarSede(id:number, estado:number){
  Swal.fire({
    title:'Estas seguro?',
    text:
    estado === 1? 'La sede sera habilitada':'La sede sera deshabilitada',
    icon:'warning',
    showCancelButton: true,
    confirmButtonColor:'#3085d6',
    cancelButtonColor: '#D33',
    confirmButtonText:'Si, estoyseguro!',
    cancelButtonText: 'Cancelar',
  }).then((result)=>{
    if(result.isConfirmed){
      this.sedeService.deleteSede(id, estado).subscribe({
        next:(data)=>{
          this.mostrarSede();
          Swal.fire(
            estado === 1? 'Habilidado':'Deshabilitado',
            'Correcto',
            'success'
          );
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  });
}



mostrarSedeTipo(event:any){
  console.log(event.target.value);
  this.estado = event.target.value;
  this.mostrarSede();
}



obtenerSedeId(id:number){
  this.sedeService.getIdSede(id).subscribe({
    next:(data)=>{
      this.sedeEditarForm.setValue({
        nombre: data.resp.nombre,
      });
      this.ids = data.resp.id;
    },
    error:(error) => {
      console.log(error);
    }
  });
}



cancelar(){
  this.sedeForm.setValue({
    nombre: '',
  });
  this.sedeEditarForm.setValue({
    nombre: '',
  });
}


}
