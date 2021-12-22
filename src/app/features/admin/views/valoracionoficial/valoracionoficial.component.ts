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

  generalEstadisticas:boolean = false;
  filtradosEstadisticas:boolean = false;
  title = 'Estadísticas generales de las fichas.';  
  type = 'ColumnChart';  
  data = [  
     ['Name1',100.0],  
     ['Name2', 36.8],  
     ['Name3', 42.8],  
     ['Name4', 18.5],  
     ['Name5', 16.2]  
  ];  
  columnNames = ['Name', 'Percentage'];  
  options = {    
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6', '#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']  
  };  
  width = 500;  
  height = 300;  


  titlesComisarias = [];

  balanceGeneral = [['',0],['',0],['',0],['',0],['',0],['',0],['',0],['',0],['',0],['',0]];
  limitesGeneralFechaDesde = null;
  limitesGeneralFechaHasta = null;


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
      this.calcularBalanceGeneral();
    });
  }

  calcularBalanceGeneral()
  {
    console.log(this.limitesGeneralFechaDesde);
    
    let valoracionesNuevas = this.valoraciones.filter(x=> {
      if(this.limitesGeneralFechaDesde == null && this.limitesGeneralFechaHasta) return true;
      if(this.limitesGeneralFechaDesde != null && this.limitesGeneralFechaHasta == null)
      {
        return x.fecha >= this.limitesGeneralFechaDesde;
      }
      if(this.limitesGeneralFechaDesde != null && this.limitesGeneralFechaHasta != null)
      {
        return x.fecha >= this.limitesGeneralFechaDesde && x.fecha <= this.limitesGeneralFechaHasta;
      }
      if(this.limitesGeneralFechaHasta != null)
      {
        return x.fecha <= this.limitesGeneralFechaHasta;
      }
      return true;
    });
    console.log(valoracionesNuevas)
//    if(this.limitesGeneralFechaDesde == null ) valoracionesNuevas = this.valoraciones.filter(x=> this.valora)
    let ret = new Map<string, number>();
    for(let ficha of valoracionesNuevas){
      let pDetalle = JSON.parse(ficha.puntuacionDetalle);
      console.log(pDetalle);
      for(let i = 0; i < pDetalle.length; i++)
      {
        //this.balanceGeneral[i][0]++;
        if(!ret.has(pDetalle[i].label)) ret.set(pDetalle[i].label, 0);
        ret.set(pDetalle[i].label, ret.get(pDetalle[i].label)+pDetalle[i].checked*pDetalle[i].puntaje);
        /*if(pDetalle[i].checked)
        {
          ret[pDetalle[i].label] = ret[pDetalle[i].label]+1;
        }*/
        //ret[pDetalle[i].label] = ret[pDetalle[i].label]+pDetalle[i].checked;
        //ret[pDetalle[i].label]+= pDetalle[i].puntaje*pDetalle[i].checked;
      }
    }

    let retValue = [];
    for(let piv of ret)
    {
      piv[1] = 100*piv[1]/ this.valoraciones.length;
      retValue.push(piv);
    }
    let post = [];
    console.log(retValue);
    if(retValue.length == 0) retValue.push(['Sin datos', 0]);
    this.balanceGeneral = retValue;
/*    this.data = [];
    for(let )
    ret.*/
//    this.balanceGeneral = 
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
