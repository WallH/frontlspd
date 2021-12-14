import { Accion } from "./accion";
import { Rango } from "./rango";

export class Permisos
{
    constructor(public rango?:Rango, public acciones?: Array<Accion>,public _id?:string)
    {
        this.rango = rango;
        this.acciones = acciones;
        this._id = _id;
    }
}