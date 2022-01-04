import { Component, OnInit } from '@angular/core';
import { GradoSancion } from 'src/app/models/gradosancion';
import { Sancion } from 'src/app/models/sancion';
import { Usuario } from 'src/app/models/usuario';
import { GradoSancionService } from 'src/app/services/gradosancion.service';
import { SancionesService } from 'src/app/services/sanciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-sancionar',
  templateUrl: './sancionar.component.html',
  styleUrls: ['./sancionar.component.css']
})
export class SancionarComponent implements OnInit {

  usuarios:Array<Usuario> = new Array<Usuario>();
  sancion:Sancion = new Sancion();

  gradosSanciones:Array<GradoSancion> = new Array<GradoSancion>();
  sanciones:Array<Sancion> = new Array<Sancion>();
  sancionesFiltradas:Array<Sancion> = new Array<Sancion>();

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  usuariosFiltrados = new Array<Usuario>();
  maxDate = new Date();
  limpiarFiltro()
  {
    this.sancionesFiltradas = this.sanciones;
  }
  nuevoFiltro()
  {
    let ej = new Sancion();
    this.propiedades = DynamicFilters.getProperties(ej);
    this.filtros.push({
      property: '',
      value: ''
    });
  }
  buscar()
  {
    this.sancionesFiltradas = DynamicFilters.Filter(this.sanciones, this.filtros);
  }
  borrarFiltro(filtro)
  {
    this.filtros.splice(this.filtros.indexOf(filtro),1);
  }

  //#endregion


  constructor(private usuariosService:UsuarioService,private gradoSancionService:GradoSancionService, private sancionService:SancionesService) { 
    this.cargarGrados();
    this.cargarSanciones();
    this.cargarUsuarios();
  }

  ngOnInit(): void {
  }

  cargarUsuarios()
  {
    this.usuariosService.getAll().then(response=>{
      this.usuarios = response.data.response;
    })
  }

  cargarGrados()
  {
    this.gradoSancionService.getAll().then(response=>{
      this.gradosSanciones = response.data.response;
    })
  }

  crearSancion()
  {
    this.sancionService.add(this.sancion).then(response=>
    {
      alert("Sanción agregada.");
      this.cargarSanciones();
    })
  }

  cargarSanciones()
  {
    this.sancionService.getAll().then(response=> {
      this.sanciones = response.data.response;
      this.sancionesFiltradas = this.sanciones;
    }); 
  }

  

  sancionDetalle:Sancion = null;
  verDetalle(sancion)
  {
    this.sancionDetalle = sancion;
  }
}
