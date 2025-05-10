import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";



const AsignarEntrenamiento = () =>{
    const {id}= useParams();
    const navigate= useNavigate();
    const [entrenamiento, setEntrenamiento] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntrenamiento = async ()=> {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch (`http://localhost:8000/api/v1/entrenamientos/${id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok) throw new Error ('No se puso cargar el entrenamiento');
                const data= await response.json();
                setEntrenamiento(data);
            }catch (err){
                alert(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchEntrenamiento();
    }, [id]);

    const handleAsignar = async() =>{
        try{
           const token = localStorage.getItem('token');
           const response = await fetch(`http://localhost:8000/api/v1/entrenamientos/user/${id}/asignar`, {
            method: 'POST',
            headers: {
                Authorization:`Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
           });
           if (!response.ok) throw new Error('Error al asignar rutina');
           alert(`Entrenamiento "${entrenamiento.nombre}" asignado con éxito`);
           navigate('/mi-entrenamiento');
        }catch (err){
            alert(err.message);
        }
    }

    if (loading) return  <div className="text-center mt-5">Cargando...</div>;
    if(error) return <div className="alerte alert-danger text-center"></div>;
    if (!entrenamiento) return <div className="text-center mt-5">No encontrado</div>;

    return(
        
        <div className="container fluid py-5">  
            <div className="row justify-content-center">   
            {/* <Sidebar/>  */}
                <div className="col-md-10 col-lg-8">     
                <div className="card shadow- rounded-4 border-0" 
                style={{backgroundColor: '#fef9e7', paddin:'2rem'}}>           
                <h2 className="text-center text-primary fw-bold mb-4">{entrenamiento.nombre}</h2>
                
                <h4 className="text-secondary mb-3">Ejercicios:</h4>
                <ul className="list-group mb-4">
                    {entrenamiento.ejercicios?.length?(
                        entrenamiento.ejercicios.map((ej) => (
                            <li key={ej.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{ej.nombre}</strong>
                                    <span className="text-muted ms-2"> - {ej.pivot.series} series x {ej.pivot.repeticiones} repeticiones</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted fst-italic">No hay ejercicios asignados</li>
                    )}    
                </ul>
                <div className="text-center">
                    <button className="btn btn-lg px-5 py-2"
                    onClick={handleAsignar}
                    style={{
                        backgroundColor: '#c7ceea',
                        color:'#333',
                        border: 'none',
                        borderRadius: '2rem',
                        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
                        transitin: 'all 0.2s ease-in-out'
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}>Asignar rutina</button>
                </div>
                </div>
                </div> 
            </div>
        </div>
  );
     
}
export default AsignarEntrenamiento;