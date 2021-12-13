import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { ValoracionOficial } from '../models/valoracionoficial';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionOficialService extends GenericService<ValoracionOficial>{

    constructor() {
        super('valoracionoficial/');
    }  
    
}