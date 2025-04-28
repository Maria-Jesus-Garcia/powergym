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
    getEntrenamientoById: (id)=> {
        const token = localStorage.getItem('token');
        return axios.get(`${base_api_url}/entrenamientos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            withCredentials: true
        });
    },
    
    // Obtener todos los ejercicios
    getEjercicios: () => {
        const token = localStorage.getItem('token');
        return axios.get(`${base_api_url}/ejercicios`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            withCredentials: true
        });
    },

// Obtener ejercicios de un entrenamiento específico
    getEjerciciosPorEntrenamientos: (id) => {
        const token = localStorage.getItem('token');
        return axios.get(`${base_api_url}/entrenamientos/${id}/ejercicios`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            withCredentials: true
        });
    },
// Actualizar entrenamiento
    updateEntrenamiento: (id, data) => {
        const token = localStorage.getItem('token');
        return axios.put(`${base_api_url}/entrenamientos/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
            withCredentials: true
        });
    },
// Sincronizar ejercicios de un entrenamiento
    syncEjercicios: (id, data) => {
        const token = localStorage.getItem('token');
        return axios.put(`${base_api_url}/entrenamientos/${id}/sync-ejercicios`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            },
        withCredentials: true
        });
    }
}
