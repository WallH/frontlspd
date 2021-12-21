import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comisaria } from 'src/app/models/comisaria';
import { ComisariaService } from 'src/app/services/comisaria.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-comisaria',
  templateUrl: './comisaria.component.html',
  styleUrls: ['./comisaria.component.css']
})
export class ComisariaComponent implements OnInit {

  comisarias:Array<Comisaria> = new Array<Comisaria>();
  comisaria:Comisaria = new Comisaria();
  comisariaEdicion:Comisaria = null;
  acciones:Array<Comisaria> = new Array<Comisaria>();
  accionNueva:Comisaria = new Comisaria();

  comisariaForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    indicativo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
  });

  comisariaFormEdit = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    indicativo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
  });

    //#region Filtros
    filtros = new Array<any>();
  

    propiedades = new Array<any>();
    comisariasFiltradas = new Array<Comisaria>();
  
    limpiarFiltro()
    {
      this.comisariasFiltradas = this.comisarias;
    }
    nuevoFiltro()
    {
      let ej = new Comisaria();
      this.propiedades = DynamicFilters.getProperties(ej);
      this.filtros.push({
        property: '',
        value: ''
      });
    }
    buscar()
    {
      this.comisariasFiltradas = DynamicFilters.Filter(this.comisarias, this.filtros);
    }
    borrarFiltro(filtro)
    {
      this.filtros.splice(this.filtros.indexOf(filtro),1);
    }
  
    //#endregion
  


  constructor(private comisariaService:ComisariaService, private formBuilder:FormBuilder) {
    this.cargarComisarias();
   }
  
  ngOnInit(): void {
  }

  editarComisaria(comisaria)
  {
    this.comisariaEdicion = comisaria;
    this.assignDataToFormGroup(this.comisariaFormEdit, this.comisariaEdicion);
  }

  assignDataToFormGroup(formGroup:FormGroup, elem:any)
  {
    if(elem != null)
    {
      let obj = Object.getOwnPropertyNames(formGroup.controls);
      for(let x of obj)
      {
        
        if(typeof(elem[x]) == "string" && elem[x].endsWith(".000Z"))
        {
          formGroup.controls[x].setValue(elem[x].substring(0,10));
          continue;
        }
        formGroup.controls[x].setValue(elem[x]);
      }  
      return;
    }
    formGroup.reset();
  }


  crearComisaria()
  {
    this.assignFormDataToElement(this.comisariaForm);
    this.comisariaService.add(this.comisaria).then(response=>{
      this.cargarComisarias();
    });
  }
  
  cargarComisarias()
  {
    this.comisariaService.getAll().then(response=>{
      this.comisarias = response.data.response;
      this.comisariasFiltradas = this.comisarias;
    });
  }

  confirmarEdicion()
  {
    this.assignEditFormDataToElement(this.comisariaFormEdit);
    this.comisariaService.edit(this.comisariaEdicion._id, this.comisariaEdicion).then(response=>
    {
        this.cargarComisarias();
        alert("Comisaría editada con éxito.");
    });
  }
  assignFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.comisaria[x] = formGroup.get(x)?.value;
    }
  }

  assignEditFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.comisariaEdicion[x] = formGroup.get(x)?.value;
    }
  }
}
