export class GradoSancion
{
    constructor(public nombre?:string, public dias?:Number, public acumulacion?:GradoSancion, public acumulacionCantidad?:number, public _id?:string)
    {
        this.nombre = nombre;
        this.dias = dias;
        this.acumulacion = acumulacion;
        this.acumulacionCantidad = acumulacionCantidad;
        this._id = _id;
    }
}