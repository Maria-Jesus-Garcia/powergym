import React from 'react';
import Sidebar from '../components/Sidebar'; // Asegúrate de que la ruta es correcta

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar en columna izquierda */}
        <div className="col-md-3 col-lg-2">
          <Sidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-md-9 col-lg-10 p-5 text-center">
          <h2 className="text-primary fw-bold mb-4">Dale un impulso a tus entrenamientos</h2>
          <p className="fs-5 text-muted mb-4">
            Organiza tus rutinas con una estructura potente. Diseña entrenamientos efectivos, asigna ejercicios y lleva el control de tu progreso fácilmente.
          </p>
          <img 
            src="/img/entrenamiento.png" // Asegúrate de haber movido tu imagen a `public/entrenamiento.png`
            alt="Entrenamiento motivacional"
            style={{
              maxWidth: '400px',
              width: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
