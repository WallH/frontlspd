import { Component, OnInit } from '@angular/core';
import { FichaPTB } from 'src/app/models/fichaptb';
import { FichaPTBService } from 'src/app/services/fichaptb.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-fichasptb',
  templateUrl: './fichasptb.component.html',
  styleUrls: ['./fichasptb.component.css']
})
export class FichasptbComponent implements OnInit {


  valoracionDetalle:FichaPTB = null;
  valoraciones:Array<FichaPTB> = new Array<FichaPTB>();
  valoracionesFiltradas:Array<FichaPTB> = new Array<FichaPTB>();

  //#region Filtros
  filtros = new Array<any>();
  

  propiedades = new Array<any>();

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


  constructor(private fichasPTBService:FichaPTBService) {
    this.cargarValoraciones();
   }

  ngOnInit(): void {
  }

  cargarValoraciones()
  {
    this.fichasPTBService.getAll().then(response=>{
      this.valoraciones = response.data.response;
      this.valoracionesFiltradas = this.valoraciones;
    });
  }

  vistaDetalle:any = [];
  verDetalle(valoDetalle)
  {
    this.valoracionDetalle = valoDetalle;
  }

  eliminarFicha(ficha)
  {
    if(!confirm('¿Confirma borrado de ficha?')) return;
    this.fichasPTBService.delete(ficha._id).then(response=>
    {
      this.cargarValoraciones();
    }).catch(err=>{
    });
  }
}
