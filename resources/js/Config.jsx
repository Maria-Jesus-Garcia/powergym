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
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            return response;
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;  // Aquí podrías devolver un error más amigable para el usuario.
        }
    }
    //getLogout:()=>axios.post(`${base_api_url}/auth/logout`)
    // getLogout: async () => {
    //     try {
    //       const response = await axios.post('/api/logout');
    //       const data = response.data; // <- define 'data' correctamente
    //       localStorage.removeItem("token");
    //       alert(data.message);
    //     } catch (error) {
    //       console.error("Error al cerrar sesión", error);
    //       alert("Hubo un problema al cerrar sesión");
    //     }
    //   },
}