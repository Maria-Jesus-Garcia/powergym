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
        const token = localStorage.getItem('token');
        
        
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

  if (loading) return /*<div>Cargando entrenamientos...</div>;*/<div class="spinner-border text-info" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
  if (error) return <div>Error: {error}</div>;

  const pastelColors = [
    '#FFFA9E',  // Amarillo pastel
    '#B5EAD7',  // Verde menta pastel
    '#FFDAC1',  // Naranja pastel
    '#C7CEEA',  // Azul pastel
    '#FFC8DD',  // Rosa pastel
    '#D5AAFF',  // Violeta pastel
    '#F2B5D4',  // Rosa chicle pastel
  ];

  return (
    <div className="container my-4">
    <h2 className="text-center text-dark fw-bold mb-4 fs-2">Selecciona un Entrenamiento</h2>
  
    <div className="row justify-content-center">
      {entrenamientos.map((entrenamiento) => {
        //Color aleatorio para las tarjetas
        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]
          return(

        <div key={entrenamiento.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div 
            className={`card postit-card h-100 ${selectedEntrenamiento === entrenamiento.id ? 'border-primary' : ''}`}
            onClick={() => handleSelectEntrenamiento(entrenamiento.id)}
            style={{ backgroundColor: randomColor, cursor: "pointer" }}
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{entrenamiento.nombre}</h5>
              {entrenamiento.descripcion && (
                <p className="card-text">{entrenamiento.descripcion}</p>
              )}
              <div className="mt-auto">
                <button 
                  className="btn btn-outline-primary btn-sm w-100 mb-2"
                  onClick={(e) => {
                    e.stopPropagation(); // para que no dispare también seleccionar
                    navigate(`/entrenamientos/${entrenamiento.id}/editar`);
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </div>
      <div className="d-flex gap-3 mt-4 justify-context-center"></div>
        <button onClick={handleAsignarEntrenamiento}className="btn btn-outline-primary btn-lg flex-grow-1"disabled={!selectedEntrenamiento}>
          Asignar Entrenamiento
        </button>
        <button  onClick={() => navigate ('/entrenamientos/create')}  className='btn btn-outline-success btn-lg flex-grow-1'>
          Haz tu propio entrenamiento
        </button>
      </div>
  );
};

export default EntrenamientosAll;
