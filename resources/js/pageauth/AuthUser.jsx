import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthUser = ()=> {
    const navigate  = useNavigate();

    const getToken =()=>{
        const tokenString = localStorage.getItem('token');
        
        return tokenString;
    }
    const getUser=() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        return userString ? JSON.parse(userString): null;
    }
    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken=(user, token) =>{
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        setUser(user);
        setToken(token);
    }

    const getLogout= ()=> {
        localStorage.clear();
        navigate('/');
    }


    return{
        setToken: saveToken,
        token,
        user,
        getToken,
        getUser,
        getLogout
    };
    
}

export default AuthUser;