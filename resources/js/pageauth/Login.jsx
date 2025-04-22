import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Config from '../Config';

const Login= ()=> {
    
    const [contraseña, setContraseña]= useState("");  
    const [email, setEmail]= useState("");
    const navigate= useNavigate()
    const [message, setMessage]= useState("");

    const submitLogin= async(e)=> {
        e.preventDefault();
        await axios.get('/sanctum/csrf-cookie').then((response)=>{
            Config.getLogin({email, contraseña})
            .then(({data})=>{
                console.log("respuesta del login", data);
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("usuario", JSON.stringify(data.user));

            navigate("/dashboard");
            })
            .catch((error)=>{
                console.error("Error al hacer login:", error);
            });

        })

    }
         return (
            <div className='container'>
                <div className="row justify-content-center">
                    <div className="col-sm-4">
                        <div className="card mt-5 mb-5">
                            <div className="card-body">
                                <h1 className='text-center fw-bolder'>LOGIN</h1>
                            
                                <input type="email" className='form-control mt-3' placeholder='Email:' value={email}
                                onChange={(e)=>setEmail(e.target.value)} required />

                                <input type="password" className='form-control mt-3' placeholder='Contraseña:' value={contraseña}
                                 onChange={(e)=>setContraseña(e.target.value)} required/>

                                <button onClick={submitLogin} className='btn btn-primary w-100 mt-3'>ENVIAR</button>
                                 <p className='text-center mt-3'>{message}</p>
                                 <hr />
                                 <p className='text-center'>No tengo cuenta</p>
                                 <a href="/register" className='btn btn-primary w-100 mt-3'>Registro</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
export default Login;
