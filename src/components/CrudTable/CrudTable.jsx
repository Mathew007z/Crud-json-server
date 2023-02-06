import CrudTableRow from "../CrudTableRow/CrudTableRow"
import './crudtable.css';



const CrudTable = ({db, deleteData, setDataToEdit}) => {
  return (
    <div className="table">
        <h3>Tabla de Héroes</h3>
        <table>
            <thead>
                <tr className="tr-name">
                    <th className="th-name">Nombre</th>
                    <th className="th-name">Arma</th>
                    <th className="th-name">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    db.length === 0 ? <tr><td colSpan='3'>Sin Datos</td></tr>
                    : db.map((db) => (
                        <CrudTableRow 
                        db={db} 
                        key={db.id}
                        setDataToEdit={setDataToEdit}
                        deleteData={deleteData}
                        />
                    )) 
                }
            </tbody>
        </table>
    </div>
  )
}

export default CrudTable