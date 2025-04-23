import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = ()=> {
    return(
        <div className="d-flex flex-colum flex-shrink-o p-3 bg-light" style={{ width: '200px', height: '100vh', 
            backgroundColor: '#000', color:  '#fff', position:'fixed', top:60, left:0,
            padding:'1.5rem', zIdex:1000, boxShadow: '2px 0 5px rgba(0,0,0,0.5', borderTopRightRadius:'10px'}}>
            {/* <h5 className="text-black mb-4">Menú</h5> */}
            
            <div className="d-flex flex-column gap-3">
                <div className="list-group">
                    <NavLink to="/entrenamientos" 
                    className="text-decoration-none p-3 bg-dark text-white rounded-3 shadow-sm">
                        Entrenamientos</NavLink>
                    <NavLink to="/progresos" 
                    className="text-decoration-none p-3 bg-dark text-white rounded-3 shadow-sm">
                        Progresos</NavLink>
                    <NavLink to="/perfil" 
                    className="text-decoration-none p-3 bg-dark text-white rounded-3 shadow-sm">
                        Perfil</NavLink>     
                </div>               
            </div>
        </div>
    );
}
export default Sidebar;