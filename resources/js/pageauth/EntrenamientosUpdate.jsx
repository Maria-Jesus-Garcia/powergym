import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../Config";
import Sidebar from "../components/Sidebar";

const EntrenamientosUpdate = () => {

    const navigate = useNavigate()
    const {id} = useParams();
    const [nombreEntrenamiento, setNombreEntrenamiento] = useState('');
    const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState([]);
    const [ejerciciosSeleccionados, setEjerciciosSeleccionados] = useState([]);
    const [series, setSeries] = useState(3);
    const [repeticiones, setRepeticiones] = useState(10);
    const [fechaSeleccionada, setFechaSeleccionada]= useState(new Date().toISOString());
    const [isLoading, setIsLoading]= useState(true);
    const [error, setError] = useState(null);


    useEffect(() =>{
        const fetchData =async (ev)=> {
            try{
                setIsLoading(true);

                //1.Obtener entreno existente
                const { data: entrenamiento} = await Config.getEntrenamientoById(id);
                setNombreEntrenamiento(entrenamiento.nombre);
                setSeries(entrenamiento.series ||3);
                setRepeticiones(entrenamiento.repeticiones ||10);
                setFechaSeleccionada(entrenamiento.fecha || new Date().toISOString());
                //2.obtener ejercicos
                 const {data: ejerciciosDisponiblesData} = await Config.getEjercicios()
                 setEjerciciosDisponibles(ejerciciosDisponiblesData);
                //3.Obtener ejercicios ya asignados
                const { data:ejerciciosAsignados}= await Config.getEjerciciosPorEntrenamientos(id);
                //console.log('Ejercicios asignados:', ejerciciosAsignados);

                if(Array.isArray(ejerciciosAsignados)){
                    const ejerciciosFormateados = ejerciciosAsignados.map(e => ({
                    
                        ejercicio_id: e.id,
                        nombre: e.nombre,
                        series: e.pivot.series,
                        repeticiones: e.pivot.repeticiones
                    }));
                    setEjerciciosSeleccionados(ejerciciosFormateados);
                    // setEjerciciosDisponibles(ejerciciosFormateados);
                } else{
                    console.error("La respuesta de ejercicios asignados no es un array:", ejerciciosAsignados);
                    //setEjerciciosSeleccionados([]);
                    //setEjerciciosDisponibles([]);
                }

            } catch (err){
                console.error('Error al cargar datos:', err);
                setError('Error al cargar datos del entrenamiento');
            } finally{
                setIsLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const agregarEjercicio= (ejercicioId)=> {
        const ejercicio = ejerciciosDisponibles.find(e => (e.id || e.ejercicio_id) === ejercicioId);
        if (ejercicio && !ejerciciosSeleccionados.some(e=> e.ejercicio_id ===(ejercicio.ejercicio_id || ejercicio.id))){
            setEjerciciosSeleccionados(prev =>[...prev, 
                {
                    ejercicio_id: ejercicio.ejercicio_id || ejercicio.id,
                    nombre: ejercicio.nombre, 
                    series: ejercicio.series||3,
                    repeticiones: ejercicio.repeticiones|| 10
                }
            ]);
        }
    };
    const eliminarEjercicio = (index) => {
        setEjerciciosSeleccionados (prev => prev.filter((_, i) => i !==index));
    };
    const actualizarEjercicio = (index, campo, valor)=> {
        setEjerciciosSeleccionados(prev =>
            prev.map((ejercicio, i) =>
            i === index ? {...ejercicio, [campo]: Number(valor) }
            :ejercicio
            )
        );
    };
    const handleSubmit =async (e)=> {
        e.preventDefault();

        if (ejerciciosSeleccionados.length === 0){
            alert('Debes seleccionar al menos un ejercicio');
            return;
        }
        try{
            setIsLoading(true);
            
            //actualiza datos basicos de entrenamiento
            await Config.updateEntrenamiento(id, {
                nombre: nombreEntrenamiento, 
                series, 
                repeticiones, 
                fecha: fechaSeleccionada
            });
            //sincronización
            await Config.syncEjercicios(id, {
                 ejercicios: ejerciciosSeleccionados.map(e =>({
                     ejercicio_id: e.ejercicio_id,
                     series: e.series,
                     repeticiones: e.repeticiones
                 }))
             });
            alert('Entrenamiento actualizado');
            navigate('/entrenamientos');
        } catch (err){
            console.error('Error al actualizar:', err);
            alert('Error al actualizar entrenamiento');
        } finally{
            setIsLoading(false);
        }
    }

    if(isLoading) return (
    <div className="text-centr my-5">
        <div className="spinner-border">
        </div>
    </div>)
    if (error) return(
    <div className="alert alert-danger">{error}</div>)
    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar/>
                </div>
                <div className="col-md-9">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2>Editar entrenamiento</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* Campos del formulario */}
                                <div className="mb-3">
                                    <label className="form-label">Nombre del entrenamiento</label>
                                    <input 
                                        type= "text"
                                        className="form-control"
                                        value= {nombreEntrenamiento}
                                        onChange= {(e)=> setNombreEntrenamiento(e.target.value)}
                                        required
                                        />
                                </div>
                            {/* Selector de ejercicios */}
                            <div className="mb-3">
                                <label className="form-label">Añadir ejercicio</label>
                                <select 
                                    className="form-select"
                                    onChange={(e)=> {
                                        if (e.target.value){
                                            agregarEjercicio(Number(e.target.value))}
                                            e.target.value= "";
                                        }
                                    }
                                >
                                <option value= "">Selecciona un ejercicio</option>
                                {ejerciciosDisponibles
                                .filter(ejercicio => !ejerciciosSeleccionados.some(sel =>sel.ejercicio_id === ejercicio.ejercicio_id))
                                .map(ejercicio=> (
                                    <option key={ejercicio.ejercicio_id || ejercicio.id} value ={ejercicio.ejercicio_id || ejercicio.id}>{ejercicio.nombre}</option>
                                ))}
                                </select>    
                            </div>
                            {/* Lista de ejercicios seleccionados */}
                            <div className="mb-3">
                                    <h5>Ejercicios seleccionados</h5>
                                    {ejerciciosSeleccionados.length === 0 ? (
                                        <p className="text-muted">No hay ejercicios seleccionados</p>
                                    ) : (
                                        <ul className="list-group">
                                            {ejerciciosSeleccionados.map((ejercicio, index) => (
                                                <li key={ejercicio.ejercicio_id} className="list-group-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <strong>{ejercicio.nombre}</strong>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => eliminarEjercicio(index)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="row mt-2">
                                                        <div className="col">
                                                            <label>Series</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={ejercicio.series}
                                                                onChange={(e) => actualizarEjercicio(index, 'series', e.target.value)}
                                                                min="1"
                                                            />
                                                        </div>
                                                        <div className="col">
                                                            <label>Repeticiones</label>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={ejercicio.repeticiones}
                                                                onChange={(e) => actualizarEjercicio(index, 'repeticiones', e.target.value)}
                                                                min="1"
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                
                                <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EntrenamientosUpdate

