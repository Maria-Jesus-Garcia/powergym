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

        {/* Sidebar */}
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-md-9 col-lg-10 p-5">
          {entrenamiento ? (
            <>
              <div className="row align-items-center mb-4">
                <div className="col text-center">
                  <h2 className="fw-bold text-primary mb-0">{entrenamiento.nombre}</h2>
                </div>
                <div className="col-auto">
                  <span className="badge bg-success fs-6">
                  {entrenamiento.ejercicios.length} ejercicios
                  </span>
                </div>
              </div>
              <div className="row">
                {entrenamiento.ejercicios?.map((ejercicio) => (
                  <div key={ejercicio.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-center text-dark fw-bold">
                          {ejercicio.nombre}
                        </h5>
                        <div className="text-center my-2">
                          <span className="badge bg-primary me-2">
                            Series: {ejercicio.pivot.series}
                          </span>
                          <span className="badge bg-secondary">
                            Reps: {ejercicio.pivot.repeticiones}
                          </span>
                        </div>
                        {ejercicio.urlfoto && (
                          <img
                            src={ejercicio.urlfoto}
                            alt={ejercicio.nombre}
                            className="img-fluid rounded mt-3"
                            style={{ objectFit: "contain", maxHeightight: "200px" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="alert alert-info text-center">
              No tienes ningún entrenamiento asignado actualmente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default MiEntrenamiento;
