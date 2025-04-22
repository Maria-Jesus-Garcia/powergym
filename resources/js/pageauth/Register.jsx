import React, { useState } from 'react'
import Config from '../Config';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [nombre, setNombre]= useState("");
    const [edad, setEdad]= useState("");
    const [peso_actual, setPesoActual]= useState("");
    const [peso_objetivo, setPesoObjetivo]= useState("");
    const [contraseña, setContraseña]= useState("");
    const [contraseña_confirmation, setContraseña_confirmation] = useState("");
    const [email, setEmail]= useState("");
    const navigate= useNavigate()

    const submitRegistro= async(e)=>{
        e.preventDefault();

        Config.getRegister({nombre, edad, peso_actual, peso_objetivo,  email, contraseña, contraseña_confirmation})
        .then(({data})=>{
            if(data){
                navigate("/login")
            }
            //console.log(data)
         })
    }


    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-sm-4">
                    <div className="card mt-5 mb-5">
                        <div className="card-body">
                            <h1 className='text-center fw-bolder'>REGISTRO</h1>
                            <input type="text" className='form-control' placeholder='Nombre:' value={nombre}
                             onChange={(e)=>setNombre(e.target.value)} required/>

                            <input type="text" className='form-control mt-3' placeholder='Edad:' value={edad}
                             onChange={(e)=>setEdad(e.target.value)} required/>

                            <input type="text" className='form-control mt-3' placeholder='Peso actual:' value={peso_actual}
                             onChange={(e)=>setPesoActual(e.target.value)} required/>

                            <input type="text" className='form-control mt-3' placeholder='Peso objetivo:' value={peso_objetivo}
                             onChange={(e)=>setPesoObjetivo(e.target.value)} required/>

                             <input type="email" className='form-control mt-3' placeholder='Email:' value={email}
                             onChange={(e)=>setEmail(e.target.value)} required />

                             <input type="password" className='form-control mt-3' placeholder='Contraseña:' value={contraseña}
                             onChange={(e)=>setContraseña(e.target.value)} required/>

                             <input type="password" className='form-control mt-3' placeholder='Confirmar contraseña:' value={contraseña_confirmation}
                             onChange={(e)=>setContraseña_confirmation(e.target.value)} required/>

                             <button onClick={submitRegistro} className='btn btn-primary w-100 mt-3'>ENVIAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register