import { Tooltip } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const ProgresoGrafica =() => {
    const [progresos, setProgresos] = useState([]);
    const [nuevoPeso, setNuevoPeso] = useState('');
    const [pesoObjetivo, setPesoObjetivo] = useState('');
    const [fecha, setFecha] = useState('');


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
        fetchProgresos();
    }, []);

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

    return(
        <div>
            <form onSubmit={handleSubmit} className='mb-4'>
                <input 
                    type= "number"
                    step="0.1"
                    value= {nuevoPeso}
                    onChange= {(e) => setNuevoPeso(e.target.value)}
                    placeholder='Peso actual'
                    required/>
                <input 
                type= "date"
                value= {fecha}
                onChange={(e) => setFecha(e.target.value)}
                required/>
                <button type="submit">Guardar Progreso</button>
            </form>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progresos}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="peso_actual" stroke="#8884d8" />
                    <Line type="monotone" dataKey="peso_objetivo" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default ProgresoGrafica;