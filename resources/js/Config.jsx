import axios from "axios";

const base_api_url="http://localhost:8000/api/v1";
//Route

export default{
    //AUTH
    getRegister:(data)=>axios.post(`${base_api_url}/auth/register`, data),
    getLogin:(data)=>axios.post(`${base_api_url}/auth/login`, data),


    getLogout: async (token) => {
        
         try {
             const response = await axios.post(
                 `${base_api_url}/auth/logout`, 
                 {},
                 { headers: { 'Authorization': `Bearer ${token}`, /*'Accept': 'application/json'*/ } }
             );
             localStorage.removeItem('token');//
             delete axios.defaults.headers.common['Authorization'];

             console.log('Logout exitoso', response);
             return response;
         } catch (error) {
            localStorage.removeItem('token');//

             console.error("Error al cerrar sesión:", error);
             throw error;  
         }
     },
    getEntrenamientosAll:()=> axios.get(`${base_api_url}/entrenamientos` ),
    getEntrenamientosStore: (data) => axios.get(`${base_api_url}/entrenamientos`, data ),

}