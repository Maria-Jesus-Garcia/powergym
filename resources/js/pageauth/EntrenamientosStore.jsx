import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'


const EntrenamientosStore = () => {

    const [nombreEntrenamiento, setNombreEntrenamiento] = useState('');
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
    const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
    const [series, setSeries] = useState(0);
    const [repeticiones, setRepeticiones] = useState(0);
    const [fechaSeleccionada, setFechaSeleccionada]= useState(new Date().toISOString());
    
    
    //Para obtener ejercicios al cargar el componente
    useEffect(() =>{
        const fetchEjercicios = async () => {
            const response = await fetch('/api/ejercicios');
            const data = await response.json();
            setEjerciciosDisponibles(data);
        };
        fetchEjercicios();
    }, []);

    const agregarEjercicio = (ejercicioId) => {
        const ejercicio= ejerciciosDisponibles.find(e => e.id === ejercicioId);
        setEjerciciosSeleccionados(prevState => [  ...prevState,{
            ejercicio_id: ejercicioId,
            nombre: ejercicio.nombre,
            series: series|| 3,
            repeticiones: repeticiones||10

        }]);
    }

    const submitStore = async(e) =>{
        e.preventDefault();
        //1)crear el entrenamiento
        const token = sessionStorage.getItem('token');
        //console.log("TOKEN ACTUAL", token);

        const entrenamientosResponse = await fetch('http://localhost:8000/api/v1/entrenamientos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                nombre: nombreEntrenamiento,
                usuario_id: localStorage.getItem('user_id'),
                series: series,
                repeticiones: repeticiones,
                fecha: fechaSeleccionada,
                ejercicios: ejerciciosSeleccionados.map(e => e.ejercicio_id),
            })
        })
        const entrenamientosData = await entrenamientosResponse.json();

        //2)Relacionar ejercicios (tabla pivote)
        await Promise.all(
            ejerciciosSeleccionados.map(ejercicio => 
                fetch('/api/entrenamiento_ejercicios', {
                    method: 'POST',
                    headers: {
                        'Content-type':'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        entrenamiento_id: entrenamientosData.id,
                        ejercicios_id: ejercicio.ejercicio_id,
                        series: ejercicio.series,
                        repeticiones: ejercicio.repeticiones
                    })
                })
            )
        );
        alert('Entrenamiento guardado');
    }


    return (
        <div className='container mt-4'>
            {/* /*<Sidebar />*/ }
            <h2>Crear un nuevo entrenamiento</h2>
            <form onSubmit={submitStore}>

                <div className='mb-3'>
                    <label className='form-label'>Nombre del entrenamiento</label>
                    <input type='text' className='form-control' value={nombreEntrenamiento}
                    onChange={(e) => setNombreEntrenamiento(e.target.value)} required />
                </div>

                <div className='mb-3'>
                    <label className='form.lable'>Añadir ejercicio</label>
                    <select className='form-select' onChange={(e) => agregarEjercicio( Number(e.target.value))}>
                        <option value="">Selecciona un ejercicio</option>
                        {ejerciciosDisponibles.map(ejercicio => ( <option key={ejercicio.id} value={ejercicio.id}>
                            {ejercicio.nombre}</option>

                        ))}
                    </select>
                </div>

                <div className='row mb-3'>
                    <div className='col'>
                        <label className='form-label'>Series</label>
                        <input type= "number" className='form-control' value={series}
                        onChange={(e) => setSeries(e.target.value)} min="1" />

                    </div>
                    <div className="col">
                        <label className="form-label">Repeticiones</label>
                        <input type="number" className="form-control" value={repeticiones}
                        onChange={(e) => setRepeticiones(e.target.value)} min="1"/>
                    </div>
                </div>
                <ul className="list-group mb-3">
                    {ejerciciosSeleccionados.map((item, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between">
                            <span>
                                {item.nombre} - {item.series}x{item.repeticiones}
                            </span>
                            <button type="button" className="btn btn-sm btn-danger"
                            onClick={() =>{setEjerciciosSeleccionados(prev => 
                                prev.filter((_, i) => i !== index) //filtra el array
                              );
                            }}>Eliminar</button>
                        </li>
                    ))}
                </ul>

                <button type="submit" className="btn btn-primary">Guardar Entrenamiento</button>
            </form>
        </div>
    );
//     <div className="container bg-light">
//         <div className='row'>
//             <Sidebar/>
//             <div className="col-sm-9 mt-3 mb-3">
//                 <div className="card">
//                     <div className="card-body">
//                         <form onSubmit={submitStore}>
//                             <div className="form-group row">
//                                 <div className="col-sm-8">
//                                     <label>Nombre</label>
//                                     <input className="form-control" value={nombre} onChange={(e) => setNombreEntrenamiento(e.target.value)} type="text"/>
//                                 </div>
//                                 <div className="col-sm-8">
//                                     <label>Series</label>
//                                     <input className="form-control" value={series} onChange={(e) => setSeries(e.target.value)} type="number"/>
//                                 </div>
//                                 <div className="col-sm-8">
//                                     <label>Repeticiones</label>
//                                     <input className="form-control" value={repeticiones} onChange={(e) => setRepeticiones(e.target.value)} type="number"/>
//                                 </div>
//                             </div>
//                             <div className="btn-group mt-3">
//                                 <Link to={-1} className="btn btn-secondary">Back</Link>
//                                 <button type='submit' className="btn btn-primary">Crear entrenamiento</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
      
//     </div>
//   );
}
export default EntrenamientosStore;