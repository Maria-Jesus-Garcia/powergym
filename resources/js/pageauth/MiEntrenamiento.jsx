import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";


const MiEntrenamiento = () => {
  const [entrenamiento, setEntrenamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
   useEffect(() => {
     const fetchEntrenamiento = async () => {
       try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:8000/api/v1/entrenamientos/user/asignado", {
            
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
           
         });
         if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

      // Manejo de respuesta vacía
      if (Object.keys(data).length === 0) {
        setEntrenamiento(null);
      } else {
        setEntrenamiento(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
     

      fetchEntrenamiento();
    },[]);
     // Renderizado optimizado
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-danger p-4">{error}</p>;
    




return (
  <div className="container-fluid">
    <div className="row">
      {/* <Sidebar /> */}
      <div className="col-md-9 p-4">
        {entrenamiento ? (
          <>
            <h2 className="text-primary fw-bold mb-4">{entrenamiento.nombre}</h2>
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                {entrenamiento.ejercicios?.length ? (
                entrenamiento.ejercicios.map((ejercicio) => (
                  <div key={ejercicio.id} className="mb-3">
                    <h5>{ejercicio.nombre}</h5>
                    <p>Series: {ejercicio.pivot.series}</p>
                    <p>Repeticiones: {ejercicio.pivot.repeticiones}</p>
                  </div>
                ))
              ):(        
              <p className="text-muted">No hay ejercicios asignados.</p>
            )}
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-info">
          No tienes ningún entrenamiento asignado actualmente.
        </div>
      )}
    </div>
  </div>
</div>
);
};

export default MiEntrenamiento;
