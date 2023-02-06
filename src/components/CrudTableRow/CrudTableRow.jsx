

import './cssrow.css';

const CrudTableRow = ({db, setDataToEdit, deleteData}) => {
  return (
    <tr className='tr-name'>
        <td className='name-pj'>{db.name}</td>
        <td className='name-pj'>{db.arma}</td>
        <td className='name-pj'>
            <button onClick={() =>setDataToEdit(db)} className='button-row'>Editar</button>
            <button onClick={() =>deleteData(db.id)} className='button-row'>Eliminar</button>
        </td>
    </tr>
  )
}

export default CrudTableRow