import { Injectable } from '@angular/core';
import { Accion } from '../models/accion';
import { Rango } from '../models/rango';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccionesService extends GenericService<Accion>{

    constructor() {
        super('acciones/');
    }  
    
}