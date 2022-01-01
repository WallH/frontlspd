import { Component, OnInit } from '@angular/core';
import { ValoracionOficial } from 'src/app/models/valoracionoficial';
import { MyService } from 'src/app/services/my.service';

@Component({
  selector: 'app-mystats',
  templateUrl: './mystats.component.html',
  styleUrls: ['./mystats.component.css']
})
export class MystatsComponent implements OnInit {
  limitesGeneralFechaDesde = null;
  limitesGeneralFechaHasta = null;

  title = 'Estadísticas.';  
  type = 'BarChart';  

  columnNames = ['Name', 'Porcentaje'];  
  options = {    
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6', '#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']  
  };  
  width = 500;  
  height = 300;  
  valoraciones:Array<ValoracionOficial> = new Array<ValoracionOficial>();
  balanceGeneral = [['Sin datos', 0]];

  constructor(private myService:MyService) {
    myService.getMyStats().then(response=>
      {
        this.valoraciones = response.data.response;
        this.obtenerInfoPD();

      });
   }

  ngOnInit(): void {
  }


  oficialStats = { oficial: null, puntuacion: 0, fichas:null, stats: [['Sin datos', 0]]};


  obtenerInfoPD()
  {
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
    if(retValue.length == 0) retValue.push(['Sin datos', 0]);
    this.balanceGeneral = retValue;
  }

}
