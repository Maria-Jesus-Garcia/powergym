import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ()=> {
    return(
        <div className=" border-end p-4 position-fixed shadow-sm"
        style={{
            width: '220px',
            top: '60px', //ajustarlo con el navbar
            left:0,
            height: '100vh',
            zIndex:1000,
            borderTopRightRadius: '15px',
            borderBottomRightRadius: '15px',
            backgroundColor: '#fdfdfd'
        }}>
            {/* <h5 className='mb-4 text-center text-uppercase fw-bold' style= {{letterSpacing: '1px'}}>
                PowerGym
            </h5> */}
            <nav className='nav flex-column gap-3'>
                <NavLink to="/entrenamientos" className={({isActive}) => 
                `nav-link rounded-3 px-2 py-4 fs-4 ${isActive? 'bg-primary text-white fw-bold shadow-sm' : 'bg-secondary-subtle text-dark'}`}>
                    Entrenamientos
                </NavLink>
                <NavLink to="/entrenamientos/create" className={({isActive}) => 
                `nav-link rounded-3 px-2 py-4 fs-4 ${isActive ? 'bg-primary text-white fw-bold shadow-sm' : 'bg-secondary-subtle text-dark'}`}>
                    Crealo
                </NavLink>
                <NavLink to="/mi-entrenamiento" className={({isActive}) => 
                `nav-link rounded-3 px-2 py-4 fs-4 ${isActive ? 'bg-primary text-white fw-bold shadow-sm' : 'bg-secondary-subtle text-dark'}`}>
                    Mi entrenamiento
                </NavLink>
                <NavLink to="/progresos" className={({isActive}) => 
                `nav-link rounded-3 px-2 py-4 fs-4 ${isActive ? 'bg-primary text-white fw-bold shadow-sm' : 'bg-secondary-subtle text-dark'}`}>
                    Progresos
                </NavLink>               
                <NavLink to="/perfil" className={({isActive}) => 
                `nav-link rounded-3 px-2 py-4 fs-4 ${isActive ? 'bg-primary text-white fw-bold shadow-sm' : 'bg-secondary-subtle text-dark'}`}>
                    Perfil
                </NavLink>
            </nav>
        </div>
    );
}
export default Sidebar;