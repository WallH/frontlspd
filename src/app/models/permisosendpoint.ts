import { Accion } from "./accion";

export class PermisosEndpoint
{
    constructor(public endpoint?:string, public acciones?:Array<Accion>, public _id?:string)
    {
        this.endpoint = endpoint;
        this.acciones = acciones;
        this._id = _id;
    }
}