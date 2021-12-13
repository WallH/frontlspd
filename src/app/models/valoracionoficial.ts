import { Usuario } from "./usuario";

export class ValoracionOficial
{
    constructor(public oficial?:Usuario, public encargado?:Usuario, public puntuacion?:Number, public puntuacionDetalle?:any, public observacion?:String, public fecha?:Date, public _id?:string)
    {
        this.oficial = oficial;
        this.encargado = encargado;
        this.puntuacion = puntuacion;
        this.observacion = observacion;
        this.puntuacionDetalle = puntuacionDetalle;
        this.fecha = fecha;
        this._id = _id;
    }
}