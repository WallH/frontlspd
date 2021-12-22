import { Component, OnInit } from '@angular/core';
import { Comisaria } from 'src/app/models/comisaria';
import { Usuario } from 'src/app/models/usuario';
import { ValoracionOficial } from 'src/app/models/valoracionoficial';
import { ComisariaService } from 'src/app/services/comisaria.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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
  title = 'Estadísticas.';  
  type = 'BarChart';  
  data = [  
     ['Name1',100.0],  
     ['Name2', 36.8],  
     ['Name3', 42.8],  
     ['Name4', 18.5],  
     ['Name5', 16.2]  
  ];  
  columnNames = ['Name', 'Porcentaje'];  
  options = {    
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6', '#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']  
  };  
  width = 500;  
  height = 300;  


  comisarias:Array<Comisaria> = new Array<Comisaria>();
  comisaria:Comisaria = null;
  usuariosEstadisticas:Array<Usuario> = new Array<Usuario>();
  compararOficiales:boolean = false;
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


  constructor(private valoracionesService:ValoracionOficialService, private comisariaService:ComisariaService, private usuarioService:UsuarioService) {
    this.cargarValoraciones();
    this.cargarComisarias();
    this.cargarUsuarios();
   }

  ngOnInit(): void {
  }

  cargarValoraciones()
  {
    console.log(this.oficialStats);
    this.valoracionesService.getAll().then(response=>{
      this.valoraciones = response.data.response;
      this.valoracionesFiltradas = this.valoraciones;
      this.calcularBalanceGeneral();
    });
  }
  oficial1:Usuario = null;
  oficialStats = [{ oficial: null, puntuacion: 0, fichas:null, stats: [['Sin datos', 0]]}, {oficial: null, puntuacion: 0, fichas:null, stats:[['Sin datos', 0]]}];
  obtenerInfoPD(index)
  {
    //this.oficialStats[index]
    this.valoracionesService.findByFilter({oficial:this.oficialStats[index].oficial._id}).then(response=>{
      this.oficialStats[index].fichas = response.data.response;
      let ret = new Map<string, number>();
      for(let ficha of this.oficialStats[index].fichas)
      {
        let pDetalle = JSON.parse(ficha.puntuacionDetalle);
        for(let i = 0; i < pDetalle.length; i++)
        {
          //this.balanceGeneral[i][0]++;
          if(!ret.has(pDetalle[i].label)) ret.set(pDetalle[i].label, 0);
          ret.set(pDetalle[i].label, ret.get(pDetalle[i].label)+pDetalle[i].checked*pDetalle[i].puntaje);
        }
  
      }

      let retValue = [];
      for(let piv of ret)
      {
        piv[1] = 100*piv[1]/ this.oficialStats[index].fichas?.length;
        retValue.push(piv);
      }
      let post = [];
      console.log(retValue);
      if(retValue.length == 0) retValue.push(['Sin datos', 0]);
      this.oficialStats[index].stats = retValue;
      console.log(this.oficialStats);
    });
    

  }
  topOfficers = new Map<Usuario, any>();
  calcularBalanceGeneral()
  {
    console.log(this.limitesGeneralFechaDesde);
    let valoracionesNuevas = this.valoraciones.filter(x=> {
      if(this.comisaria != null && this.comisaria._id != x.oficial?.comisaria?._id) return false;
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


//    if(this.limitesGeneralFechaDesde == null ) valoracionesNuevas = this.valoraciones.filter(x=> this.valora)
    let ret = new Map<string, number>();
    for(let ficha of valoracionesNuevas){
      let pDetalle = JSON.parse(ficha.puntuacionDetalle);
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
      piv[1] = 100*piv[1]/ valoracionesNuevas.length;
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

  cargarComisarias()
  {
    this.comisariaService.getAll().then(response=>{
      this.comisarias = response.data.response;
    });
  }

  cargarUsuarios()
  {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getAll().then(response=>{
      this.usuarios = response.data.response;
    });
  }
}
