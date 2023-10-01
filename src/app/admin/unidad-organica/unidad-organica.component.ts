import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganoService } from 'src/app/servicios/organo.service';
import { UnidadOrganicaService } from 'src/app/servicios/unidad-organica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-unidad-organica',
  templateUrl: './unidad-organica.component.html',
  styleUrls: ['./unidad-organica.component.css']
})
export class UnidadOrganicaComponent implements OnInit{
listUnidad?: Array<any>;
listOrgano?: Array<any>;
unidadForm: FormGroup;
unidadEditarForm:FormGroup;
ids?: string|number;
estado: string = '1';
carga: boolean = false;
p: number = 1;

constructor(
  private unidadService: UnidadOrganicaService,
  private organoService: OrganoService,
  private fb: FormBuilder,
) {
  this.unidadForm = this.fb.group({
    nombre: ['', Validators.required],
    organo: ['', Validators.required],
  });
  this.unidadEditarForm = this.fb.group({
    nombre: ['', Validators.required],
    organo: ['', Validators.required],
  });
}


ngOnInit(): void {
this.mostrarUnidad();
this.mostrarOrgano();
}



mostrarUnidad (){
  this.carga = true;
  if(!this.carga){
    Swal.fire({
      title: 'Cargando datos!',
      html: 'Por favor espere',
      timerProgressBar: true,
      didOpen: () =>{
        Swal.showLoading();
      },
    });
  }
  this.unidadService.getUnidadorganica(this.estado).subscribe({
    next: (data) => {
      this.listUnidad = data.resp;
      this.carga = false;
      if(!this.carga){
        Swal.close();
      }
      console.log(this.listUnidad);
    },
    error: (error) =>{
      this.carga = false;
      if(!this.carga) {
        Swal.close();
      }
      console.log(error);
    }
  });
}


mostrarOrgano() {
  this.organoService.getOrgano().subscribe({
    next: (data) =>{
      this.listOrgano = data.resp;
      console.log(this.listOrgano);
    },
    error : (error) =>{
      console.log(error);
    }
  });
}


registrarUnidad() {
  const formData = new FormData();
  formData.append('nombre',this.unidadForm.get('nombre')?.value);
  formData.append('id_organo', this.unidadForm.get('organo')?.value);
  this.unidadService.postUnidadorganica(formData).subscribe({
    next:(data) =>{
      console.log(data);
      Swal.fire(
        'Registrado!',
        'Se registro la unidadorganica con exito',
        'success'
      );
      this.mostrarUnidad();
      this.cancelar();
    },
    error:(error) =>{
      console.log(error);
    }
  });
}


editarUnidad () {
  const formData = new FormData();
  formData.append('nombre', this.unidadEditarForm.get('nombre')?.value);
  formData.append('id_organo', this.unidadEditarForm.get('organo')?.value);
  this.unidadService.putUnidadorganica(formData, this.ids!).subscribe({
    next: (data) =>{
      console.log(data);
      Swal.fire(
        'Editado!',
        'La unidad organica se edito con exito',
        'success'
      );
      this.mostrarUnidad();
    },
    error: (error)=>{
      console.log(error);
    }
  });
}


mostrarUnidadTipo (event: any) {
  console.log(event.target.value);
  this.estado = event.target.value;
  this.mostrarUnidad();
}



obtenerUnidadId (id: number) {
  this.unidadService.getIdUnidadorganica(id).subscribe({
    next: (data) =>{
      this.unidadEditarForm.setValue({
        nombre: data.resp.nombre,
        organo: data.resp.id_organo,
      })
      this.ids = data.resp.id;
    },
    error : (error) =>{
      console.log(error);
    }
  });
}




eliminarUnidad (id:number, estado:number) {
  Swal.fire({
    title:'Estas seguro?',
    text: estado === 1? 'La unidad sera habilitado':'La unidad sera deshabilitado',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085D6',
    cancelButtonColor: '#d33',
    confirmButtonText:'Si, estoy seguro!',
  }).then((result)=>{
    if(result.isConfirmed){
      this.unidadService.deleteUnidadorganica(id, estado).subscribe({
        next: (data) => {
          this.mostrarUnidad();
          Swal.fire(
            estado===1?'Habilitado':'Deshabilitado',
            'Correcto',
            'success',
          );
        },
        error: (error) =>{
          console.log(error);
          
        }
      });
    }
  });
}






cancelar (){
  this.unidadForm.setValue({
    nombre: '',
    organo: '',
  });
  this.unidadEditarForm.setValue({
    nombre: '',
    organo: '',
  });
}



}