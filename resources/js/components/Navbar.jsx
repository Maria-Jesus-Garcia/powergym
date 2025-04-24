import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Config from '../Config';
import AuthUser from '../pageauth/AuthUser';



const Navbar= ()=> {

    const navigate= useNavigate();

    const { getLogout, getToken} = AuthUser();

    const logoutUser =()=>{
        const token = getToken();

        if(token){
            Config.getLogout(token) //(token)
            .then(response=>{
                console.log(response);
                localStorage.removeItem('token');
                getLogout();
                navigate("/");
            })
            .catch(error=>{
                console.error('Error al hacer logout:', error);
            })
        }else{
            console.error('No hay token disponible para el logout');
        }
      
    }

    const renderLinks =() =>{

        console.log('TOKEN ACTUAL', getToken());//a ver que devuekve
        const token= getToken();


        if(token){//si hay token, muestra botón logout
            return(
                <>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={logoutUser}>Logout</a>
                </li>
                
                </>
            )
            }else{//si no hay token, muestra boton login y registro
                return(
                    <>
                    <li className="nav-item">
                        <a className="nav-link" href="/login" >Login</a>
                    </li>
                    <li className= "nav-item">
                        <a className= "nav-link" href="/register">Registrate</a>

                    </li>
                    </>
                )
        }
    }


    return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className= "container">       
                    <a className="navbar-brand" href="/">POWERGYM</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
        <           div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                {/* <li className="nav-item">
                    <a className="nav-link" href="/entrenamiento">Entrenamiento</a>
                </li>                */}
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {renderLinks()}
                    </ul>
                    </div>
                </div>  
            </nav>    
    )
}
export default Navbar;