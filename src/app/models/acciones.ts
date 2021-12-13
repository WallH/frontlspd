export class Accion
{
    constructor(public nombre?:String, public descripcion?:String, public _id?:String)
    {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this._id = _id;
    }
}