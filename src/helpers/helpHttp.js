

export const helpHttp = () => {
    const peticionFetch = (endpoint, options) => {

        const defaultHeader = {
            // Por defecto indicamos que lo que nos llegara es un json
            accept: 'application/json',
        };

        // Esto nos proporciona un cotrolador de errores manualmente, por si el endpoint (API) no devuelve nada.
        const controller = new AbortController();
        options.signal = controller.signal; 

        // metodos que hara el usuario, y si no especifico el metodo por default es get.
        options.method = options.method || "GET";
        options.headers = options.headers 
        ? {...defaultHeader, ...options.headers} 
        : defaultHeader;

        // Enviamos los datos convertidos en cadena de texto. Si es get le indicamos false.
        options.body = JSON.stringify(options.body) || false;
        // validacion si es false, que lo elimine porque en get no enviamos el body.
        if(!options.body){
            delete options.body;
        }
        // console.log(options)

        // establecer tiempo de comunicacion entre la API
        setTimeout(()=> controller.abort(), 3000)

        return fetch(endpoint,options)
        .then(res => res.ok ? res.json() : Promise.reject(({
            err:true,
            status:res.status || '00',
            statusText:res.statusText || 'Ocurrio un error'
        })))
        .catch((err) => err);
            
     
    }


    const get = (url,options = {}) => peticionFetch(url,options);

    const post = (url,options = {}) => {
        options.method = 'POST';
        return peticionFetch(url,options);
    }

    const put = (url,options = {}) => {
        options.method = 'PUT';
        return peticionFetch(url,options);
    }

    const del = (url,options ={}) => {
        options.method = 'DELETE';
        return peticionFetch(url,options);
    }

    return {
        get, 
        post, 
        put, 
        del,
    }
}