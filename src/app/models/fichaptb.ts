import { Usuario } from "./usuario";

export class FichaPTB
{
    constructor(public oficial?:Usuario, public encargado?:Usuario, public puntuacion?:Number, public rangodurante?:String, public desempeno?:String, public psicologia?:String, public promovible?:Boolean, public fecha?:Date, public _id?:string)
    {
        this.oficial = oficial;
        this.encargado = encargado;
        this.puntuacion = puntuacion;
        this.rangodurante = rangodurante;
        this.desempeno = desempeno;
        this.psicologia = psicologia;
        this.promovible = promovible;
        this.fecha = fecha;
        this._id = _id;
    }
}