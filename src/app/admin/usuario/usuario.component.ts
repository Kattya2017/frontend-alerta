import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultUsuario } from 'src/app/interfaces/usuario-interface';
import { RolService } from 'src/app/servicios/rol.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
listUsuario?:Array<any>;
listRol?: Array<any>;
usuarioForm: FormGroup;
usuarioEditarForm: FormGroup;
ids?: string | number;
estado: string = '1';
carga: boolean = false;
p: number = 1;


constructor(
  private usuarioService: UsuarioService,
  private rolService: RolService,
  private fb: FormBuilder
){
  this.usuarioForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    password: ['', Validators.required],
    rol: ['', Validators.required],
  });
  this.usuarioEditarForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    usuario: ['', Validators.required],
    password: ['', Validators.required],
    rol: ['', Validators.required],
  });
}

ngOnInit(): void {
  this.mostrarUsuario();
  }

mostrarUsuario () {
  this.carga = true;
  if (this.carga) {
    Swal.fire({
      title: 'Cargando datos!',
      html: 'Por favor espere',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }
  this.usuarioService.getUsuario(this.estado).subscribe({
    next:(data)=>{
      this.listUsuario = data.resp;
      console.log(this.listUsuario);
      this.carga = false;
      if (!this.carga) {
        Swal.close();
      }
    },
    error:(error)=>{
      this.carga = false;
      if (!this.carga) {
        Swal.close();
      }
      console.log(error);
      
    }
  })
}


mostrarRol () {
  this.rolService.getRol().subscribe({
    next: (data:ResultUsuario)=>{
      this.listRol = data.resp;
      console.log(this.listRol);
    },
    error: (error) =>{
      console.log(error);
    }
  });
}


registrarUsuario (){
  const formData = new FormData();
  formData.append('nombre', this.usuarioForm.get('nombre')?.value);
  formData.append('apellido', this.usuarioForm.get('apellido')?.value);
  formData.append('usuario', this.usuarioForm.get('usuario')?.value);
  formData.append('password', this.usuarioForm.get('password')?.value);
  formData.append('id_rol', this.usuarioForm.get('rol')?.value);
  this.usuarioService.postUsuario(formData).subscribe({
    next:(data)=>{
      console.log(data);
      Swal.fire(
        'Rgistrado',
        'Se registro el usuario con exito',
        'success'
      );
      this.mostrarUsuario();
      this.cancelar();
    },
    error:(error)=>{
      console.log(error);
    }
  });
}


modificarUsuario (){
  const formData = new FormData();
  formData.append('nombre', this.usuarioEditarForm.get('nombre')?.value);
  formData.append('apellido', this.usuarioEditarForm.get('apellido')?.value);
  formData.append('usuario', this.usuarioEditarForm.get('usuario')?.value);
  formData.append('id_rol', this.usuarioEditarForm.get('rol')?.value);
  formData.append('password', this.usuarioEditarForm.get('password')?.value);
  this.usuarioService.putUsuario(formData, this.ids!).subscribe({
    next:(data)=>{
      console.log(data);
      Swal.fire(
        'Editado!',
        'Se edito el usuario con exito',
        'success'
      );
      this.mostrarUsuario();
    },
    error:(error)=>{
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
      this.usuarioService.deleteUsuario(id, estado).subscribe({
        next:(data)=>{
          this.mostrarUsuario();
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

mostrarUsuarioId(id:number){
  this.usuarioService.getIdUsuario(id).subscribe({
    next:(data)=>{
      this.usuarioEditarForm.setValue({
        nombre: data.resp.nombre,
        apellido: data.resp.apellido,
        usuario: data.resp.usuario,
        password: data.resp.password,
        rol: data.resp.id_rol
      });
      this.ids = data.resp.id;
    },
    error:(error) =>{
      console.log(error);
    },
  });
}


obtenerUsuarioId(id:number){
  this.usuarioService.getIdUsuario(id).subscribe({
    next:(data)=>{
      this.usuarioEditarForm.setValue({
        nombre: data.resp.nombre,
        apellido: data.resp.apellido,
        usuario: data.resp.usuario,
        password: data.resp.password,
        id_rol: data.resp.id_rol
      });
      this.ids = data.resp.id;
    },
    error:(error)=>{
      console.log(error);
    }
  });
}


mostrarUsuarioTipo(event:any){
  console.log(event.target.value);
  this.estado = event.target.value;
  this.mostrarUsuario();
}


cancelar(){
  this.usuarioForm.setValue({
    nombre: '',
    apellido: '',
    usuario: '',
    password:'',
    id_rol: ''
  });

  this.usuarioEditarForm.setValue({
    nombre: '',
    apellido: '',
    usuario: '',
    password:'',
    id_rol: ''
  });
}

}
