export class GradoSancion
{
    constructor(public nombre?:string, public dias?:Number, public _id?:string)
    {
        this.nombre = nombre;
        this.dias = dias;
        this._id = _id;
    }
}