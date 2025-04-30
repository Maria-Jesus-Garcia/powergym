import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const MiEntrenamiento = () => {
  const [entrenamiento, setEntrenamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntrenamiento = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8000/api/v1/entrenamientos/mi-entrenamiento", {
            method: 'Get',
            headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("No tienes entrenamiento asignado");
        const data = await response.json();
        setEntrenamiento(data);
      } catch (err) {
        setEntrenamiento(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrenamiento();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 p-4">
          {loading ? (
            <p>Cargando entrenamiento...</p>
          ) : entrenamiento ? (
            <>
              <h2 className="text-primary">{entrenamiento.nombre}</h2>
              <p><strong>Series:</strong> {entrenamiento.series}</p>
              <p><strong>Repeticiones:</strong> {entrenamiento.repeticiones}</p>
              <h4>Ejercicios:</h4>
              <ul className="list-group">
                {entrenamiento.ejercicios.map(ej => (
                  <li key={ej.id} className="list-group-item">
                    {ej.nombre} - {ej.pivot.series}x{ej.pivot.repeticiones}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted">No tienes entrenamiento asignado aún.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiEntrenamiento;
