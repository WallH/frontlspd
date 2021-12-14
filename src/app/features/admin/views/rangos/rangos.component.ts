import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Rango } from 'src/app/models/rango';
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


  rangoForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    poder: ['', [Validators.required, Validators.min(0), Validators.max(1000)]],
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


  
  constructor(private rangoService:RangoService, private formBuilder:FormBuilder) { 
    this.cargarRangos();
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
  }

  crearRango()
  {
    this.rangoService.add(this.rango).then(response=>{
        this.cargarRangos();
        alert("Rango creado");
    });
  }

  obtenerPermisosRango(rango)
  {
  }
  
  ngOnInit(): void {
  }

}
