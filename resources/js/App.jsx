import React from 'react'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'

import LayoutPublic from './layouts/LayoutPublic';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageHome from './pagepublic/PageHome';
import Login from './pageauth/Login';
import Register from './pageauth/Register';
import Dashboard from './pageauth/Dashboard';
import EntrenamientosAll from './pageauth/EntrenamientosAll';
import EntrenamientosStore from './pageauth/EntrenamientosStore';

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element= {<LayoutPublic/>}>
                    <Route index element= {<PageHome/>} />
                    <Route path='/login' element={<Login/>}/>
                    <Route path= '/register' element={<Register/>}/>
                    <Route path= '/dashboard' element={<Dashboard/>}/>
                    <Route path= '/entrenamientos' element={<EntrenamientosAll/>}/>
                    <Route path= '/entrenamientos/create' element= {<EntrenamientosStore/>}/>
                    

                </Route>               
            </Routes>
        </Router>
    )
}

export default App

if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}