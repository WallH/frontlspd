import { Accion } from "./acciones";
import { Rango } from "./rango";

export class Permisos
{
    constructor(public rango?:Rango, public accion?: Array<Accion>,public _id?:string)
    {
        this.rango = rango;
        this.accion = accion;
        this._id = _id;
    }
}