import { Injectable } from '@angular/core';
import { Rango } from '../models/rango';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class RangoService extends GenericService<Rango>{

    constructor() {
        super('rango/');
    }  
    
}