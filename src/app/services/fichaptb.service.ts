import { Injectable } from '@angular/core';
import { FichaPTB } from '../models/fichaptb';
import { Usuario } from '../models/usuario';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class FichaPTBService extends GenericService<FichaPTB>{

    constructor() {
        super('fichaptb/');
    }  
    
}