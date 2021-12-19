import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Accion } from 'src/app/models/accion';
import { PermisosEndpoint } from 'src/app/models/permisosendpoint';
import { AccionesService } from 'src/app/services/acciones.service';
import { PermisosEndpointService } from 'src/app/services/permisosendpoint.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-permisosendpoint',
  templateUrl: './permisosendpoint.component.html',
  styleUrls: ['./permisosendpoint.component.css']
})
export class PermisosendpointComponent implements OnInit {

  permisosendpoints:Array<PermisosEndpoint> = new Array<PermisosEndpoint>();
  permisosendpoint:PermisosEndpoint = new PermisosEndpoint();
  permisosEndpointEdicion = null;

  acciones:Array<Accion> = new Array<Accion>();
  accionNueva:Accion = new Accion();

  permisosForm = this.formBuilder.group({
    endpoint: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
  });

  permisosEditForm = this.formBuilder.group({
    endpoint: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
  });

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  permisosendpointsFiltrados = new Array<PermisosEndpoint>();

  limpiarFiltro()
  {
    this.permisosendpointsFiltrados = this.permisosendpoints;
  }
  nuevoFiltro()
  {
    let ej = new PermisosEndpoint();
    this.propiedades = DynamicFilters.getProperties(ej);
    this.filtros.push({
      property: '',
      value: ''
    });
  }
  buscar()
  {
    this.permisosendpointsFiltrados = DynamicFilters.Filter(this.permisosendpoints, this.filtros);
  }
  borrarFiltro(filtro)
  {
    this.filtros.splice(this.filtros.indexOf(filtro),1);
  }

  //#endregion




  constructor(private permisosEndpointService:PermisosEndpointService, private accionesService:AccionesService,private formBuilder:FormBuilder) { 
    this.cargarAcciones();
    this.cargarPEndpoints();
  }

  ngOnInit(): void {
  }

  cargarPEndpoints()
  {
    this.permisosEndpointService.getAll().then(response=>
      {
        this.permisosendpoints = response.data.response;
        this.permisosendpointsFiltrados = this.permisosendpoints;
      });
  }
  cargarAcciones()
  {
    this.accionesService.getAll().then(response=>{
      this.acciones = response.data.response;
    });
  }

  agregarPermiso()
  {
    const found = this.permisosEndpointEdicion.acciones.filter(x=> x._id == this.accionNueva._id).length > 0;
    if(found)
    {
      alert("No se puede agregar este permiso porque este rango ya lo tiene.");
      return;
    } 
    this.permisosEndpointEdicion.acciones.push(this.accionNueva);
  }

  quitarPermiso(permiso)
  {
    this.permisosEndpointEdicion.acciones.splice(this.permisosEndpointEdicion.acciones.indexOf(permiso), 1);
  }

  confirmarPermisos()
  {
    this.permisosEndpointService.edit(this.permisosEndpointEdicion._id, this.permisosEndpointEdicion).then(response=>{
      alert("Nuevos permisos activados.")
    })
  }
  verPermisos(permiso)
  {
    this.permisosEndpointEdicion = permiso;
    //this.permisosEdicion = null;
  }
}
