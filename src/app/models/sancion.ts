import { GradoSancion } from "./gradosancion";
import { Usuario } from "./usuario";

export class Sancion
{
    constructor(public oficial?:Usuario, public supervisor?:Usuario, public grado?:GradoSancion, public observacion?:String, public rangodurante?:string, public fecha?:Date, public anuladaporacumulacion?:Sancion, public acumuladas?:Array<Sancion>, public fechaFin?:Date, public degrado?:Boolean, public _id?:string)
    {
        this.oficial = oficial;
        this.supervisor = supervisor;
        this.grado = grado;
        this.observacion = observacion;
        this.rangodurante = rangodurante;
        this.fecha = fecha;
        this.anuladaporacumulacion = anuladaporacumulacion;
        this.acumuladas = acumuladas;
        this.fechaFin = fechaFin;
        this.degrado = degrado;
        this._id = _id;
    }
}