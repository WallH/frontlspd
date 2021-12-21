import { Comisaria } from "./comisaria";
import { Rango } from "./rango";

export class Usuario
{
    constructor(public nombre_usuario?:string, public clave?:string, public nombre?:string, public apellido?:string, public rango?:Rango, public activo?:Boolean, public comisaria?:Comisaria,public _id?:string)
    {
        this.nombre_usuario = nombre_usuario;
        this.clave = clave;
        this.nombre = nombre;
        this.apellido = apellido;
        this.rango = rango;
        this.activo = activo;
        this.comisaria = comisaria;
        this._id = _id;
    }
}