import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate } from 'react-router-dom'


const EntrenamientosStore = () => {

    const [nombreEntrenamiento, setNombreEntrenamiento] = useState('');
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
    const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
    const [series, setSeries] = useState(0);
    const [repeticiones, setRepeticiones] = useState(0);
    const [fechaSeleccionada, setFechaSeleccionada]= useState(new Date().toISOString());
    const [busquedaEjercicio, setBusquedaEjercicio] = useState('');
    const navigate = useNavigate();
    
    
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
                navigate('/entrenamientos')
            } catch (error) { //añado este catch
                console.error('Error al guardar el entrenamiento:', error);
                alert(`Error al guardar: ${error.message}`);
            }
    }
    const ejerciciosFiltrados= ejerciciosDisponibles.filter(e =>
        e.nombre.toLowerCase().includes(busquedaEjercicio.toLowerCase())
    );


    return (
        <div className='container fluid mt-4'>
            <div className='row'>
                <div className="col-md-3 col-lg-2">
                    <Sidebar />
                </div>
                <div className='col-md-9 col-lg-10'>
                    <h2 className='text-center mb-4'>Crear un nuevo entrenamiento</h2>
                    <div className='row'>
                {/* Columna izquierda: ejercicios disponibles */}
                <div className='col-md-8'>
                    <h4>Ejercicios disponibles</h4>
                    <input 
                    type= 'text'
                    className='form-control mb-3'
                    placeholder='Buscar ejercicio...'
                    value={busquedaEjercicio}
                    onChange={(e) => setBusquedaEjercicio(e.target.value)}/>
                    <div className='row'>
                        {ejerciciosFiltrados.length > 0 ? (
                            ejerciciosFiltrados.map((ejercicio)=> {
                                const seleccionado = ejerciciosSeleccionados.some(e => e.ejercicio_id === ejercicio.id);
                                return(
                                    <div key={ejercicio.id} className=' col-6 col-md-4 mb-3'>
                                        <div className='card h-100 postit-card'
                                        style={{
                                            backgroundColor: seleccionado ? '#d1fae5' : '#fef3c7',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => agregarEjercicio(ejercicio.id)}>
                                            <img 
                                            src= {ejercicio.urlfoto}
                                            className='card-img-top'
                                            alt={ejercicio.nombre}
                                            style={{height: '150px', objectFit: 'cover'}}/>
                                            <div className='card-body'>
                                        <h5 className='card-title text-center'>{ejercicio.nombre}</h5>
                                        </div>
                                    </div>
                                </div>
                                );
                            })
                            ):(
                                <p className='text-muted text-center'>No se encontraron ejercicios.</p>
                        )}                           
                    </div>
                </div>
                {/* Columna derecha: ejercicios seleccionados */}
                <div className='col-md-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre del entrenamiento</label>
                        <input
                        type="text"
                        className='form-control'
                        value={nombreEntrenamiento}
                        onChange={(e) => setNombreEntrenamiento(e.target.value)} required />
                    </div>
                    {/* <button type="submit" onClick={submitStore} className='btn btn-success w-100'>Guardar entrenamiento</button> */}
                    <h4>Ejercicios seleccionados</h4>
                    <ul className='list-group mb-3'>
                        {ejerciciosSeleccionados.map((item, index)=> (
                            <li key= {index} className='list-group-item'>
                                <strong>{item.nombre}</strong>
                                <div className='col-5'>
                                    <label className='form-label'>Series</label>
                                    <input 
                                    type= "number"
                                    className='form-control'
                                    min= "1"
                                    value={item.series}
                                    onChange= {(e)=> {
                                        const nuevas = [...ejerciciosSeleccionados];
                                        nuevas[index].series =e.target.value;
                                        setEjerciciosSeleccionados(nuevas);
                                    }}/>                                  
                                </div>
                                <div className='col-5'>
                                    <label className='form-label'>Reps</label>
                                    <input
                                    type= "number"
                                    className='form-control'
                                    min="1"
                                    value={item.repeticiones}
                                    onChange={(e) =>{
                                        const nuevas = [... ejerciciosSeleccionados];
                                        nuevas[index].repeticiones = e.target.value;
                                        setEjerciciosSeleccionados(nuevas);
                                    }}/>
                                </div>
                                <div className='col-2 d-flex align-items-center'>
                                    <button
                                    type="button"
                                    className='btn btn-sm btn-danger'
                                    onClick={()=> 
                                        setEjerciciosSeleccionados((prev)=>
                                        prev.filter((_, i) => i !==index)
                                    )
                                    }>✕</button>
                                </div>
                            
                            </li>
                        ))}
                    </ul>
                    <button type="submit" onClick={submitStore} className='btn btn-success w-100'>Guardar entrenamiento</button>
                    </div>
                    </div>
                </div>
            </div>
        </div> 
    )  
 }
                    
export default EntrenamientosStore;