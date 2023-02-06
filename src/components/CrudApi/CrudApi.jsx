import CrudForm from "../CrudForm/CrudForm";
import CrudTable from "../CrudTable/CrudTable";
import {useEffect, useState} from 'react';
import './crudapi.css';
import { helpHttp } from "../../helpers/helpHttp";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";


const CrudApp = () => {
    const [db, setDb] = useState(null)  // Cuando este Null significa que va a haber una insercion de datos
    // Si da true, significa que se hara una edicion de datos.
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url ="http://localhost:5000/heroes"; 


    const getHeroes = () => {
        api.get(url)
        .then(res =>{
            if(!res.err){
                setDb(res)
                setError(null)
            }else{
                setDb(null);
                setError(res)
            }
            setLoading(false);
        }) 
    }

    // useEffect para el GET
    useEffect(() => {
        setLoading(true);
        getHeroes();
    },[])

    // POST
    const createData = (data) => {
        let options = { 
            body:data, headers:{"content-type":"application/json"}
        }

        data.id = Date.now();
        api.post(url,options).then(res => {
            console.log(res)
            if(!res.err){
                setDb([...db, res]);
            }else{  
                setError(res);
            }
        });
    }

    // PUT
    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = { 
            body:data, headers:{"content-type":"application/json"}
        }
        data.id = Date.now();
        api.put(endpoint,options).then((res) => {
            if(!res.err){
                getHeroes();
            }else{  
                setError(res);
            }
        });

     
       
    }
    // DELETE
    const deleteData = (id) => {
        let isDelete = window.confirm(`Estas seguro de querer eliminar el registro ${id}?`)
        
        if(isDelete){
            let endpoint = `${url}/${id}`;
            let options = { 
            headers:{"content-type":"application/json"}
            }
            api.del(endpoint,options).then(res => {
                if(!res.err){
                    let newData = db.filter(el => el.id !== id);
                    setDb(newData);
                }else{
                    setError(res);
                }
            })
          
        }else{
            return
        }
    }


  return(
    <div className="content-form">
        <h2>MARVEL</h2>
        <CrudForm 
        createData={createData} 
        updateData={updateData}
        dataToEdit={dataToEdit}
        // Necesitamos la actualizacion para poder editar los datos.
        setDataToEdit={setDataToEdit}
        />
        {loading && <Loader/>}
        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor='#dc3545'/>}
        { db && <CrudTable 
        db={db}
        setDataToEdit={setDataToEdit}
        deleteData={deleteData}
        />}
    </div>
  )
};

export default CrudApp;
