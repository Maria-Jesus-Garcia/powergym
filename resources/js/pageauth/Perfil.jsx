import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Perfil = ()=>{
    const [usuario, setUsuario]= useState(null);
    const [editando, setEditando] = useState(false);
    const [formData, setFormData]=  useState({});

    useEffect(()=> {
        const fetchUser = async() => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8000/api/v1/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            })
        const data =await response.json();
        setUsuario(data);
        setFormData(data);
        }
        fetchUser();
    }, []);
    const handleInputChange =(e) =>{
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const handleGuardar = async () =>{
        try {
            const token = localStorage.getItem("token");
            const res = await fetch (`http://localhost:8000/api/v1/users/${usuario.id}`,{
               method: "PUT",
               headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
                Accept: "application/json",
               },
               body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error("Error al guardar");

            const actualizado = await res.json();
            setUsuario(actualizado);
            setEditando(false);
        }catch (error) {
            alert(error.message);
          }
    }
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9 p-5">
                <div className="text-center mb-4">
                    <img
                    src="https://www.gravatar.com/avatar/?d=mp"
                    alt= "Foto de perfil"
                    className="rounded-circle"
                    style={{width: "120px", height:"120px", objectFit: "cover", border: "3px solid #0d6efd"}}/>
                </div>
              <h2 className="text-primary fw-bold mb-4">Mi Perfil</h2>
    
              {usuario ? (
                <div className="d-flex flex-column gap-3">
                  {["nombre", "email", "edad", "peso_actual", "peso_objetivo"].map((campo) => (
                    <div key={campo}>
                      <label className="fw-bold text-capitalize">{campo.replace("_", " ")}:</label>
                      {editando ? (
                        <input
                          type={campo === "email" ? "email" : "text"}
                          name={campo}
                          className="form-control"
                          value={formData[campo] || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-muted mb-0">{usuario[campo]}{campo.includes("peso") ? " kg" : ""}</p>
                      )}
                    </div>
                  ))}
    
                  {editando ? (
                    <div className="mt-3">
                      <button onClick={handleGuardar} className="btn btn-success me-2">Guardar</button>
                      <button onClick={() => setEditando(false)} className="btn btn-secondary">Cancelar</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditando(true)} className="btn btn-outline-primary mt-3 w-25">Editar Perfil</button>
                  )}
                </div>
              ) : (
                <p>Cargando datos del perfil...</p>
              )}
            </div>
          </div>
        </div>
      );


}
export default Perfil;