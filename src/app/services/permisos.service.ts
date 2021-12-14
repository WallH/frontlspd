import { Injectable } from '@angular/core';
import { Accion } from '../models/accion';
import { Permisos } from '../models/permisos';
import { Rango } from '../models/rango';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService extends GenericService<Permisos>{

    constructor() {
        super('permisos/');
    }  
    
}