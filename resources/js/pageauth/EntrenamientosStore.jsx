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
        const fetchEjercicios = async()=> {
        try{
            const token = localStorage.getItem('token');//añado esto

            const response = await fetch ('http://localhost:8000/api/v1/ejercicios', {
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                credentials: 'include' //añado esto 2
            });
            if(!response.ok){
                console.error('Error en la API', response.status);
                return;
            }
            const data= await response.json();
            console.log('Ejercicios recibidos', data);
            setEjerciciosDisponibles(data);
        }catch (error) {
            console.error('Error al obtener ejercicios', error);
        }
    }   
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
        const token = localStorage.getItem('token');
        if (!token){
            alert('Debes iniciar sesión primero');
            window.location.href = '/login';   //añado estas dos lineas
            return;
        }
        //console.log("TOKEN ACTUAL", token);
        try{

            await fetch('http://localhost:8000/sanctum/csrf-cookie', { credentials: 'include'}); //añado esto2

            // 2) Preparar datos
            const user_id = localStorage.getItem('user_id');
            // const user_id = Number(localStorage.getItem('user_id')); // Convertir a número
            // if (!user_id) {
            //     throw new Error('No se encontró ID de usuario');
            // }

        const dataToSend = {
            nombre: nombreEntrenamiento,
           //usuario_id: user_id, // Asegurar que es número
            series: Number(series),
            repeticiones: Number(repeticiones),
            fecha: new Date(fechaSeleccionada).toISOString().split('T')[0], // Formato YYYY-MM-DD
            ejercicios: ejerciciosSeleccionados.map(ejercicio => ({
                ejercicio_id: Number(ejercicio.ejercicio_id),
                series: Number(ejercicio.series),
                repeticiones: Number(ejercicio.repeticiones)
            }))
        };

        console.log('Datos a enviar:', dataToSend); // Para debug



            const entrenamientosResponse = await fetch('http://localhost:8000/api/v1/entrenamientos',{
             method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,//cambio lo de abajo por esto2 
                    //'Authorization': `Bearer ${localStorage.getItem('token')}`
                    'Accept': 'application/json' //añado esto y probar sin esto tb2
                },
                credentials: 'include',
                body: JSON.stringify(dataToSend) 
                                   
            })
    
            //añado e´siguiente if
            if (!entrenamientosResponse.ok){
                const errorData =await entrenamientosResponse.json();
                console.error('Error detallado:', errorData);
                throw new Error(errorData.message || 'Error al crear entrenamiento');
            }


            const entrenamientosData = await entrenamientosResponse.json();
            console.log('Entrenamiento creado:', entrenamientosData);

        //2)Relacionar ejercicios (tabla pivote)        

            //await Promise.all(
                const ejerciciosPromises = ejerciciosSeleccionados.map(ejercicio => {
                    
                    return fetch(`http://localhost:8000/api/v1/entrenamientos/${entrenamientosData.id}/ejercicios`, {
                        method: 'POST',
                        headers: {
                            'Content-type':'application/json',
                            'Authorization': `Bearer ${token}` ///lo mismo que arriba pruebo con este en vez con el de abajo
                            //'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            entrenamiento_id: entrenamientosData.id,
                            ejercicio_id: ejercicio.ejercicio_id,
                            series: ejercicio.series,
                            repeticiones: ejercicio.repeticiones
                        })
                    })
                })
            //);
            //     alert('Entrenamiento guardado');
            // }catch(error) {
            //     console.error ('Error al guardar el entrenamiento', error)
            // }
                const ejerciciosResponses = await Promise.all(ejerciciosPromises);
                for (const response of ejerciciosResponses) {
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('Error al agregar ejercicio:', errorText);
                    }
                }
                

                alert('Entrenamiento guardado correctamente');
            } catch (error) { //añado este catch
                console.error('Error al guardar el entrenamiento:', error);
                alert(`Error al guardar: ${error.message}`);
            }
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
                    <label className='form-lable'>Añadir ejercicio</label>
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