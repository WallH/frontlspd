import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradoSancion } from 'src/app/models/gradosancion';
import { GradoSancionService } from 'src/app/services/gradosancion.service';
import DynamicFilters from 'src/app/utils/dynamicfilters';

@Component({
  selector: 'app-gradosancion',
  templateUrl: './gradosancion.component.html',
  styleUrls: ['./gradosancion.component.css']
})
export class GradosancionComponent implements OnInit {


  gradoSancions:Array<GradoSancion> = new Array<GradoSancion>();
  gradoSancion:GradoSancion = new GradoSancion();
  gradoSancionEdicion:GradoSancion = null;
  acciones:Array<GradoSancion> = new Array<GradoSancion>();
  accionNueva:GradoSancion = new GradoSancion();

  gradoSancionForm = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    dias: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
  });

  gradoSancionFormEdit = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    dias: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(64)]],
  });

    //#region Filtros
    filtros = new Array<any>();
  

    propiedades = new Array<any>();
    gradoSancionesFiltradas = new Array<GradoSancion>();
  
    limpiarFiltro()
    {
      this.gradoSancionesFiltradas = this.gradoSancions;
    }
    nuevoFiltro()
    {
      let ej = new GradoSancion();
      this.propiedades = DynamicFilters.getProperties(ej);
      this.filtros.push({
        property: '',
        value: ''
      });
    }
    buscar()
    {
      this.gradoSancionesFiltradas = DynamicFilters.Filter(this.gradoSancions, this.filtros);
    }
    borrarFiltro(filtro)
    {
      this.filtros.splice(this.filtros.indexOf(filtro),1);
    }
  
    //#endregion
  


  constructor(private gradoSancionService:GradoSancionService, private formBuilder:FormBuilder) {
    this.cargargradoSanciones();
   }
  
  ngOnInit(): void {
  }

  editargradoSancion(gradoSancion)
  {
    this.gradoSancionEdicion = gradoSancion;
    this.gradoSancionEdicion.acumulacion = this.gradoSancions.filter(x=>x._id == gradoSancion.acumulacion?._id)[0] ?? null;
    this.assignDataToFormGroup(this.gradoSancionFormEdit, this.gradoSancionEdicion);
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


  creargradoSancion()
  {
    this.assignFormDataToElement(this.gradoSancionForm);
    this.gradoSancionService.add(this.gradoSancion).then(response=>{
      this.cargargradoSanciones();
    });
  }
  
  cargargradoSanciones()
  {
    this.gradoSancionService.getAll().then(response=>{
      this.gradoSancions = response.data.response;
      this.gradoSancionesFiltradas = this.gradoSancions;
    });
  }

  confirmarEdicion()
  {
    this.assignEditFormDataToElement(this.gradoSancionFormEdit);
    this.gradoSancionService.edit(this.gradoSancionEdicion._id, this.gradoSancionEdicion).then(response=>
    {
        this.cargargradoSanciones();
        alert("Grado de sanción editada con éxito.");
    });
  }
  assignFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.gradoSancion[x] = formGroup.get(x)?.value;
    }
  }

  assignEditFormDataToElement(formGroup:FormGroup){
    let obj = Object.getOwnPropertyNames(formGroup.controls);
    for(let x of obj)
    {
      this.gradoSancionEdicion[x] = formGroup.get(x)?.value;
    }
  }
}