import { Injectable } from '@angular/core';
import { Comisaria } from '../models/comisaria';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class ComisariaService extends GenericService<Comisaria>{

    constructor() {
        super('comisaria/');
    }  
    
}