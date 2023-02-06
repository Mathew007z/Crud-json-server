import { useEffect, useState } from "react"
import groot from '../../assets/groot.png';
import './crudform.css';


// estado inicial
const initialForm = {
    name:'',
    arma:'',
    id:null
}

const CrudForm = ({updateData, createData, dataToEdit, setDataToEdit}) => {


    const [form, setForm] = useState(initialForm)

    useEffect(()=> {
        if(dataToEdit){
            setForm(dataToEdit)
        }else{
            setForm(initialForm)
        }
    },[dataToEdit])

    // Eventos
    // Toma el valor del input y la guarda en el estado from.
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value,
    });
    }

    // Envio de datos con condicional.
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!form.name || !form.arma){
            alert('Datos incompletos');
            return;
        }
        if(form.id === null){
            createData(form)
        }else{
            updateData(form)
        }
        handleReset();
    }


    const handleReset = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    }


  return (
    <div className="form-contain">
        <div className="groot">
        <img src={groot} alt={groot} style={{width:'140px'}}/>
        <h3>{dataToEdit ? 'Editar:' : 'Agregar:'}</h3>
        </div>
        <form onSubmit={handleSubmit}>
            <input
            className="input-field"
            type="text"
            name='name'
            placeholder='Nombre' 
            onChange={handleChange} 
            value={form.name}/>
            <input 
            className="input-field"
            type="text" 
            name='arma' 
            placeholder='Arma' 
            onChange={handleChange} 
            value={form.arma}/>
            <input type="submit" value='Enviar' className="button-box"/>
            <input type="reset" value='Limpiar' onClick={handleReset} className="button-box"/>
        </form>
    </div>
  )
}

export default CrudForm