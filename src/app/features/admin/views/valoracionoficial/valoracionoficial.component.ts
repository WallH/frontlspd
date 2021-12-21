import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ValoracionOficial } from 'src/app/models/valoracionoficial';
import { ValoracionOficialService } from 'src/app/services/valoracionoficial.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-valoracionoficial',
  templateUrl: './valoracionoficial.component.html',
  styleUrls: ['./valoracionoficial.component.css']
})
export class ValoracionoficialComponent implements OnInit {
  usuarios:Array<Usuario> = new Array<Usuario>();
  usuario:Usuario = new Usuario();

  valoracionDetalle:ValoracionOficial = null;
  valoraciones:Array<ValoracionOficial> = new Array<ValoracionOficial>();
  valoracionesFiltradas:Array<ValoracionOficial> = new Array<ValoracionOficial>();

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();
  usuariosFiltrados = new Array<Usuario>();

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


  constructor(private valoracionesService:ValoracionOficialService) {
    this.cargarValoraciones();
   }

  ngOnInit(): void {
  }

  cargarValoraciones()
  {
    this.valoracionesService.getAll().then(response=>{
      this.valoraciones = response.data.response;
      this.valoracionesFiltradas = this.valoraciones;
    });
  }
  vistaDetalle:any = [];
  verDetalle(valoDetalle)
  {
    this.valoracionDetalle = valoDetalle;
    this.vistaDetalle = JSON.parse(this.valoracionDetalle.puntuacionDetalle);
  }

  eliminarFicha(ficha)
  {
    if(!confirm('¿Confirma borrado de ficha?')) return;
    this.valoracionesService.delete(ficha._id).then(response=>
    {
      this.cargarValoraciones();
    }).catch(err=>{
    });
  }

}
