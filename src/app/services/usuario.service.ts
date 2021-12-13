import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { GenericService } from './generic-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends GenericService<Usuario>{

    constructor() {
        super('usuario/');
    }  
    
}