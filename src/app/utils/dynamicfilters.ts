export default class DynamicFilters {
    constructor()
    {
    }

    static Filter(array, criteria)
    {
        Object.prototype.toString = function toString()
        {
            let ret = "";
            for(let prop of Object.getOwnPropertyNames(this))
            {
                ret+= this[prop].toString()+ ' ';
            }
            return ret;
        }
        let result = array.filter(x=> {
            let ret = true;
            for(let f of criteria)
            {
                if(f.property == '') continue;
                ret&&= x[f.property]?.toString().trim().includes(f.value);
            }
            return ret;
        });
        return result;
    }

    static getProperties(object: any){
        delete object['_id'];
        delete object['imagen'];
        delete object['clave'];
        //para usuarios
        delete object['alumno'];
        let properties = Object.getOwnPropertyNames(object);
        return properties;
    }
}