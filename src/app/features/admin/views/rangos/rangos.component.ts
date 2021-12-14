import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accion } from 'src/app/models/accion';
import { Permisos } from 'src/app/models/permisos';
import { Rango } from 'src/app/models/rango';
import { AccionesService } from 'src/app/services/acciones.service';
import { PermisosService } from 'src/app/services/permisos.service';
import { RangoService } from 'src/app/services/rango.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-rangos',
  templateUrl: './rangos.component.html',
  styleUrls: ['./rangos.component.css']
})
export class RangosComponent implements OnInit {

  rangos:Array<Rango> = new Array<Rango>();
  rango:Rango = new Rango();
  rangoEdicion:Rango = null;
  acciones:Array<Accion> = new Array<Accion>();
  accionNueva:Accion = new Accion();

  rangoForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    poder: ['', [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern("^[0-9]*$")]],
  });

  rangoFormEdit = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    poder: ['', [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern("^[0-9]*$")]],
  });

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  rangosFiltrados = new Array<Rango>();

  limpiarFiltro()
  {
    this.rangosFiltrados = this.rangos;
  }
  nuevoFiltro()
  {
    let ej = new Rango();
    this.propiedades = DynamicFilters.getProperties(ej);
    this.filtros.push({
      property: '',
      value: ''
    });
  }
  buscar()
  {
    this.rangosFiltrados = DynamicFilters.Filter(this.rangos, this.filtros);
  }
  borrarFiltro(filtro)
  {
    this.filtros.splice(this.filtros.indexOf(filtro),1);
  }

  //#endregion


  
  constructor(private rangoService:RangoService, private accionesService:AccionesService, private permisosService:PermisosService, private formBuilder:FormBuilder) { 
    this.cargarRangos();
    this.cargarAcciones();
  }

  cargarAcciones()
  {
    this.accionesService.getAll().then(response=>{
      this.acciones = response.data.response;
    });
  }
  
  cargarRangos()
  {
    this.rangos = new Array<Rango>();
    this.rangoService.getAll().then(response=>{
      this.rangos = response.data.response;
      this.rangosFiltrados = this.rangos;
      console.log(this.rangos);
    })
  }

  editarRango(rango)
  {
    this.rangoEdicion = rango;
    this.permisosEdicion = null;
  }

  crearRango()
  {
    this.assignFormDataToElement(this.rangoForm); 
    this.rangoService.add(this.rango).then(response=>{
        this.cargarRangos();
        alert("Rango creado");
    });
  }
  permisosEdicion:Permisos = null;
  verPermisos(rango)
  {
    this.rangoEdicion = rango;
    this.permisosEdicion = null;
    this.permisosService.findByFilter({"rango":rango._id}).then(response=>{
      this.permisosEdicion = response.data.response;

    });
  }

  obtenerPermisosRango(rango)
  {
  }
  

  assignFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.rango[x] = formGroup.get(x)?.value;
    }
  }

  quitarPermiso(permiso)
  {
    this.permisosEdicion.acciones.splice(this.permisosEdicion.acciones.indexOf(permiso), 1);
  }

  confirmarPermisos()
  {
    this.permisosService.edit(this.permisosEdicion._id, this.permisosEdicion).then(response=>{
      alert("Nuevos permisos activados.")
    })
  }

  ngOnInit(): void {
  }

}
