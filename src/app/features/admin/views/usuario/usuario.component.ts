import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rango } from 'src/app/models/rango';
import { Usuario } from 'src/app/models/usuario';
import { RangoService } from 'src/app/services/rango.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios:Array<Usuario> = new Array<Usuario>();
  usuario:Usuario = new Usuario();
  usuarioEdicion:Usuario = null;

  usuarioForm = this.formBuilder.group({
    nombre_usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    clave: [''],
    nombre: [''],
    apellido: ['']
  });

  usuarioFormEdit = this.formBuilder.group({
    nombre_usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    clave: [''],
    nombre: [''],
    apellido: ['']
  });

  rangos:Array<Rango> = new Array<Rango>();


  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  usuariosFiltrados = new Array<Usuario>();

  limpiarFiltro()
  {
    this.usuariosFiltrados = this.usuarios;
  }
  nuevoFiltro()
  {
    let ej = new Usuario();
    this.propiedades = DynamicFilters.getProperties(ej);
    this.filtros.push({
      property: '',
      value: ''
    });
  }
  buscar()
  {
    this.usuariosFiltrados = DynamicFilters.Filter(this.usuarios, this.filtros);
  }
  borrarFiltro(filtro)
  {
    this.filtros.splice(this.filtros.indexOf(filtro),1);
  }

  //#endregion

  constructor(private usuarioService: UsuarioService, private rangoService: RangoService, private formBuilder:FormBuilder) {
    this.cargarUsuarios();
    this.cargarRangos();
   }

  cargarUsuarios()
  {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getAll().then(response=>{
      this.usuarios = response.data.response;
      this.usuariosFiltrados = this.usuarios;
    });
  }


  editarUsuario(usuario)
  {
    this.usuarioEdicion = usuario;
    console.log(this.usuarioEdicion);
    this.assignDataToFormGroup(this.usuarioFormEdit, this.usuarioEdicion);
    console.log(this.rangos.filter(x=> x._id == x._id)[0]);
    this.usuarioEdicion.rango = this.rangos.filter(x=> x._id == usuario.rango?._id)[0];
  }
  confirmarEdicion()
  {
    this.assignEditFormDataToElement(this.usuarioFormEdit);
    this.usuarioService.edit(this.usuarioEdicion._id, this.usuarioEdicion).then(res=>
      {
        this.cargarUsuarios();

      })
  }
  crearUsuario()
  {
    this.assignFormDataToElement(this.usuarioForm);
    console.log(this.usuario.rango);
    this.usuarioService.add(this.usuario).then(res=>
      {
        alert("Usuario creado");
        this.cargarUsuarios();

      });
  }


  assignDataToFormGroup(formGroup:FormGroup, elem:any)
  {
    if(elem != null)
    {
      let obj = Object.getOwnPropertyNames(formGroup.controls);
      for(let x of obj)
      {
        
        if(typeof(elem[x]) == "string" && elem[x].endsWith(".000Z"))
        {
          formGroup.controls[x].setValue(elem[x].substring(0,10));
          continue;
        }
        formGroup.controls[x].setValue(elem[x]);
      }  
      return;
    }
    formGroup.reset();
  }
  assignFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.usuario[x] = formGroup.get(x)?.value;
    }
  }
  assignEditFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.usuarioEdicion[x] = formGroup.get(x)?.value;
    }
  }
  cargarRangos()
  {
    this.rangos = new Array<Rango>();
    this.rangoService.getAll().then(response=>{
      this.rangos = response.data.response;
      console.log(this.rangos);
    })
  }

  ngOnInit(): void {
  }

}
