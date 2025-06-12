import React, { useEffect, useState } from 'react';
import { CartesianGrid, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts';
import Sidebar from './Sidebar';

const ProgresoGrafica =() => {
    const [progresos, setProgresos] = useState([]);
    const [nuevoPeso, setNuevoPeso] = useState('');
    const [pesoObjetivo, setPesoObjetivo] = useState('');
    const [fecha, setFecha] = useState('');

    //Obtengo progresos de usuarios
    useEffect(() => {
        const fetchProgresos = async ()=> {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/api/v1/progresos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                    },
                });
                const data = await response.json();
                setProgresos(data);
            }catch (err){
                console.error('Error al obtener progresos', err);
            }
        };
        

    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        const userData = await response.json();
        if (userData.peso_objetivo) {
          setPesoObjetivo(userData.peso_objetivo);
        }
      } catch (err) {
        console.error('Error al obtener usuario', err);
      }
    };

    fetchProgresos();
    fetchUsuario();
  }, []);

    //Guardar nuevo progreso:
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/v1/progresos', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //usuario_id: null, 
                    peso_actual: nuevoPeso,
                    fecha: fecha
                }),
            });
            const nuevoRegistro = await response.json();
            setProgresos([...progresos, nuevoRegistro]);
            setNuevoPeso('');
            setPesoObjetivo('');
            setFecha('');
        } catch (err){
            console.error('Error al guardar progreso:', err);
        }
    };

return (
  <div className="container-fluid">
    <div className="row">
      {/* Sidebar */}
      <div className="col-md-3 col-lg-2 px-0">
        <Sidebar />
      </div>

      {/* Contenido principal */}
      <div className="col-md-9 col-lg-10 px-5 py-5 bg-light">
        <div className="card p-4 shadow rounded-4 border-0 bg-white">
          <h2 className="text-center text-primary fw-bold mb-4">Mi progreso</h2>

            {pesoObjetivo && (
              <p className="text-center text-muted mb-4">
                Tu objetivo de peso es: <strong>{pesoObjetivo} kg</strong>
              </p>
            )}

          <form onSubmit={handleSubmit} className="row g-3 mb-4 justify-content-center">
            <div className="col-md-4">
              <input
                type="number"
                step="0.1"
                value={nuevoPeso}
                onChange={(e) => setNuevoPeso(e.target.value)}
                placeholder="Peso actual"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-success">
                Guardar progreso
              </button>
            </div>
          </form>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progresos}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="peso_actual" stroke="#8884d8" strokeWidth={2} />
                {pesoObjetivo && (
                  <ReferenceLine
                    y={parseFloat(pesoObjetivo)}
                    stroke="red"
                    strokeDasharray="6 6"
                    label={{
                      position: 'top',
                      value: `Objetivo: ${pesoObjetivo}kg`,
                      fill: 'red',
                      fontSize: 12,
                    }}
                  />
                )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);
};
export default ProgresoGrafica;