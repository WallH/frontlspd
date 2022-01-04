import { Injectable } from '@angular/core';
import { FichaPTB } from '../models/fichaptb';
import { Sancion } from '../models/sancion';
import { Usuario } from '../models/usuario';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class GradoSancionService extends GenericService<Sancion>{

    constructor() {
        super('gradosanciones/');
    }  
    
}