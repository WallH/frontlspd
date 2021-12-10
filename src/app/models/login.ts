export class Login 
{
    constructor(public usuario?:string, public clave?:string)
    {
        this.usuario = usuario;
        this.clave = clave;
    }
}