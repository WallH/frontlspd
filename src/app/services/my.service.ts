import axios from "axios";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ValoracionOficial } from '../models/valoracionoficial';

@Injectable({
    providedIn: 'root'
})

export class MyService{
protected urlFinal: string;

  constructor() { 
    this.urlFinal =  environment.apiurl + "my/";
  }

  async getMyFicha(){
    return await axios.get(this.urlFinal + "ficha", {
      withCredentials: true
    });
  }

  async changeMyPassword(passwordbody)
  {
    return await axios.put(this.urlFinal+ "password", passwordbody, {
      withCredentials: true
    });
  }

}