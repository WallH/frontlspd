import { Component, OnInit } from '@angular/core';
import { FichaPTB } from 'src/app/models/fichaptb';
import { Usuario } from 'src/app/models/usuario';
import { FichaPTBService } from 'src/app/services/fichaptb.service';
import { MyService } from 'src/app/services/my.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-fichaptb',
  templateUrl: './fichaptb.component.html',
  styleUrls: ['./fichaptb.component.css']
})
export class FichaptbComponent implements OnInit {
  maxDate = new Date();

  usuarios:Array<Usuario> = new Array<Usuario>();
  usuario:Usuario = new Usuario();


  valoracion: FichaPTB = new FichaPTB();
  valoracionDetalle:FichaPTB = null;
  valoraciones:Array<FichaPTB> = new Array<FichaPTB>();

  usuariosFiltrados:Array<Usuario> = new Array<Usuario>();

  

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  valoracionesFiltradas:Array<FichaPTB> = new Array<FichaPTB>();

  limpiarFiltro()
  {
    this.valoracionesFiltradas= this.valoraciones;
  }
  nuevoFiltro()
  {
    let ej = new FichaPTB();
    this.propiedades = DynamicFilters.getProperties(ej);
    this.filtros.push({
      property: '',
      value: ''
    });
  }
  buscar()
  {
    this.valoracionesFiltradas = DynamicFilters.Filter(this.valoraciones, this.filtros);
  }
  borrarFiltro(filtro)
  {
    this.filtros.splice(this.filtros.indexOf(filtro),1);
  }

  //#endregion


  constructor(private fichasPTBService:FichaPTBService, private usuarioService:UsuarioService, private myService:MyService) {
    this.cargarValoraciones();
    this.cargarUsuarios();
    this.valoracion.fecha = new Date();
    this.valoracion.puntuacion = 0;
   }

  ngOnInit(): void {
  }


  cargarUsuarios()
  {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getAll().then(response=>{
      this.usuarios = response.data.response;
      this.usuariosFiltrados = this.usuarios;
    });
  }

  cargarValoraciones()
  {
    this.myService.getMyFichaPTB().then(response=>{
      this.valoraciones = response.data.response;
      this.valoracionesFiltradas = this.valoraciones;      
    });
/*    this.valoracionesService.getAll().then(response=>{
      this.valoraciones = response.data.response;
      this.valoracionesFiltradas = this.valoraciones;
    });*/
  }
  
  crearFicha()
  {
    this.fichasPTBService.add(this.valoracion).then(response=>{
      alert("Ficha creada correctamente.");
      this.cargarValoraciones();
    });
  }

  vistaDetalle:any;
  verDetalle(valoDetalle)
  {
    this.valoracionDetalle = valoDetalle;
  }

}
