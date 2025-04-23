import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
const EntrenamientosStore = () => {

    const [nombre, setNombre] = useState('')
    const [series, setSeries] = useState('')
    const [repeticiones, setRepeticiones] = useState('')
    const [fecha, setFecha] = useState('')
    //video 22 minuto 3,09


    return (
    <div className="container bg-light">
        <div className='row'>
            <Sidebar/>
            <div className="col-sm-9 mt-3 mb-3">
                <div className="card">
                    <div className="card-body">
                    <form onSubmit={submitStore}>

                    </form>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  );
}
export default EntrenamientosStore;