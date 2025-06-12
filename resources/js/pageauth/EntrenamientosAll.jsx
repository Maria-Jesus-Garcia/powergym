import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
 


const EntrenamientosAll = () => {
  const [entrenamientos, setEntrenamientos] = useState([]); 
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda]= useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  console.log("Seleccionado:", selectedEntrenamiento);
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
        setEntrenamientos(Array.isArray(data) ? data : []);
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

  if (loading) return /*<div>Cargando entrenamientos...</div>;*/<div className="spinner-border text-info" role="status">
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
  if (!Array.isArray(entrenamientos)) {
    console.error("Los entrenamientos no son un array:", entrenamientos);
    return <div>Error en los datos de entrenamientos</div>;
  }
  const entrenamientosFiltrados = entrenamientos.filter((entrenamiento)=>
  entrenamiento.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">

      {/* Sidebar */}
      <div className="col-md-3 col-lg-2 px-0">
        <Sidebar />
      </div>
      <div className="col-md-9 col-lg-10 px-4 py-5">
        <h2 className="text-center text-dark fw-bold mb-4 fs-2">Selecciona un Entrenamiento</h2>
        <div className='mb-4'>
          <input
          type='text' className='form-control shadow-sm' 
          placeholder="Buscar entrenamiento..." 
          value={busqueda}
          onChange= {(e)=> setBusqueda(e.target.value)}/>
        </div>
        <div className="row justify-content-center">
          {entrenamientosFiltrados.length === 0 && (
          <p className='text-mted text-center'>No se encontraron entrenamientos.</p>
          )}
          {entrenamientosFiltrados.map((entrenamiento) => {
        //Color aleatorio para las tarjetas
        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)]
          
        return(

        <div key={entrenamiento.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
          <div className='card-flip'>
          <div 
            className={`card postit-card h-100 ${selectedEntrenamiento === entrenamiento.id ? 'seleccionado' : ''}`} 
            style= {{backgroundColor: randomColor, cursor: 'pointer'}}
            onClick={()=> handleSelectEntrenamiento(entrenamiento.id)}>
            <div className='card-inner'>
              <div className="card-front" style={{ backgroundColor: randomColor }}>                          
                <h5 className="card-title text-center">{entrenamiento.nombre}</h5>
                  {entrenamiento.descripcion && (
                  <p className="card-text ">{entrenamiento.descripcion}</p>
                  )}
                  <div className="mt-auto">
                      <button 
                        className="btn btn-outline-primary btn-sm w-100 mb-2"
                        onClick={(e) => {
                        e.stopPropagation(); // para que no dispare también seleccionar
                        navigate(`/entrenamientos/${entrenamiento.id}/editar`);
                        }}>
                      Editar
                      </button>                   
                  </div>              
              </div>
            <div className='card-back'>
              <h6 className='text-center'>Ejercicios</h6>
              <ul className='list-unstyled flex-grow-1'>
                {entrenamiento.ejercicios?.map((ejer) =>(
                  <li key={ejer.id}>• {ejer.nombre}</li>
                ))}
              </ul>
              <div className='text-center mt-2'>
              <button 
                className="btn btn-outline-primary btn-sm w-100 mt-3"
                onClick={(e) => {
                e.stopPropagation();
                navigate(`/entrenamientos/${entrenamiento.id}/editar`);
                }}>Editar</button>
              </div>
            </div>
            </div>
          </div>
          </div>
        </div>
        );
      })}
    </div>
       <div className="d-flex justify-context-center">
        <button onClick={handleAsignarEntrenamiento}
          className="btn btn-outline-primary btn-lg px-4 rounded-pill shadow-sm"
          disabled={!selectedEntrenamiento}>
          Asignar Entrenamiento
        </button>
        </div> 
      </div>
      </div>
  </div>

  );
};

export default EntrenamientosAll;
