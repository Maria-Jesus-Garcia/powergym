import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EntrenamientosAll = () => {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntrenamientos = async () => {
      try {
        const token = sessionStorage.getItem('token');
        
        
        const response = await fetch('http://localhost:8000/api/v1/entrenamientos', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Necesario para cookies/Sanctum
        });

        // Verificar si la respuesta es HTML en lugar de JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Respuesta inesperada: ${text.substring(0, 100)}...`);
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Error ${response.status}`);
        }

        const data = await response.json();
        setEntrenamientos(data);
      } catch (err) {
        console.error('Error completo:', err);
        setError(err.message.includes('Unexpected token')
          ? 'Error en el servidor. Verifica la consola para más detalles.'
          : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrenamientos();
  }, []);

  const handleSelectEntrenamiento = (entrenamientoId) => {
    setSelectedEntrenamiento(entrenamientoId);
  };
//preguntar por esto!!!!
  const handleAsignarEntrenamiento = () => {
    if (selectedEntrenamiento) {
      navigate(`/asignar-entrenamiento/${selectedEntrenamiento}`);
    } else {
      alert('Por favor, selecciona una rutina');
    }
  };

  if (loading) return <div>Cargando entrenamientos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-4">
      <h3 className="mb-4">Selecciona un Entrenamiento</h3>

      <div className="row">
        {entrenamientos.map((entrenamiento) => (
          <div key={entrenamiento.id}
            className={selectedEntrenamiento === entrenamiento.id ? 'selected' : ''}
          >
            <button 
              onClick={() => handleSelectEntrenamiento(entrenamiento.id)}
              className="entrenamiento-btn"
            >
              {entrenamiento.nombre}
              {entrenamiento.descripcion && <p>{entrenamiento.descripcion}</p>}
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleAsignarEntrenamiento}className="asignar-btn"disabled={!selectedEntrenamiento}>
        Asignar Entrenamiento
      </button>
      <button  onClick={() => navigate ('/entrenamientos/create')}  className='btn btn-success mt-3'>
        Haz tu propia rutina
      </button>

    </div>
  );
};

export default EntrenamientosAll;
