import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ValoracionOficial } from 'src/app/models/valoracionoficial';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValoracionOficialService } from 'src/app/services/valoracionoficial.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-valoracionoficial',
  templateUrl: './valoracionoficial.component.html',
  styleUrls: ['./valoracionoficial.component.css']
})
export class ValoracionoficialComponent implements OnInit {

  puntuacionNueva = [
    {
      label:"Conducción",
      puntaje: 1,
      checked: false
    }, 
    {
      label:"Comunicación radial",
      puntaje:1,
      checked: false

    }, 
    {
      label:"Protocolos",
      descripcion: "(Una vez elegida la forma de proceder, como la haces)",
      puntaje:1,
      checked: false

    }, 
    {
      label:"Procedimientos",
      descripcion: "(Criterio a la hora de elegir que hacer)",
      puntaje:1,
      checked: false

    },
    {
      label:"Trato con ciudadanía",
      puntaje:1,
      checked: false
    },
    {
      label:"Liderazgo",
      puntaje:1,
      checked: false

    },
    {
      label:"Compañerismo",
      puntaje:1,
      checked: false

    }, 
    {
      label:"Iniciativa",
      puntaje:1,
      checked: false

    }, 
    {
      label:"((Interpretación/ROL))",
      puntaje:1,
      checked: false

    },
    {
      label:"Horas de servicio",
      puntaje:1,
      checked: false
    }
  ];

  usuarios:Array<Usuario> = new Array<Usuario>();
  usuario:Usuario = new Usuario();


  valoracion: ValoracionOficial = new ValoracionOficial();
  valoracionDetalle:ValoracionOficial = null;
  valoraciones:Array<ValoracionOficial> = new Array<ValoracionOficial>();

  usuariosFiltrados:Array<Usuario> = new Array<Usuario>();

  

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  valoracionesFiltradas:Array<ValoracionOficial> = new Array<ValoracionOficial>();

  limpiarFiltro()
  {
    this.valoracionesFiltradas= this.valoraciones;
  }
  nuevoFiltro()
  {
    let ej = new ValoracionOficial();
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


  constructor(private valoracionesService:ValoracionOficialService, private usuarioService:UsuarioService) {
    this.cargarValoraciones();
    this.cargarUsuarios();
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
    this.valoracionesService.getAll().then(response=>{
      this.valoraciones = response.data.response;
      this.valoracionesFiltradas = this.valoraciones;
    });
  }
  
  crearFicha()
  {
    this.valoracion.puntuacionDetalle = JSON.stringify(this.puntuacionNueva);
    this.valoracion.puntuacion = 0;
    this.puntuacionNueva.filter(x=>{
      if(x.checked) this.valoracion.puntuacion= new Number(parseInt(x.puntaje.toString())+parseInt(this.valoracion.puntuacion.toString()));;
    })
    console.log(this.valoracion.puntuacion);
    this.valoracionesService.add(this.valoracion);
  }

  vistaDetalle:any;
  verDetalle(valoDetalle)
  {
    this.valoracionDetalle = valoDetalle;
    this.vistaDetalle = JSON.parse(this.valoracionDetalle.puntuacionDetalle);
  }

}
