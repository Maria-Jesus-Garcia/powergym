import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageHome = () => {
return (
    <div className="container py-5">
        <header className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Bienvenido a PowerGym</h1>
            <p className="lead text-secondary">Transforma tu cuerpo y mente. PowerGym te ayuda a entrenar, organizar rutinas y seguir tu progreso.</p>
        </header>

        <section className="row align-items-center mb-5">
            <div className="col-md-6 text-center">
            <img
                src="/img/planti.jpg"
                className="img-fluid rounded shadow"
                alt="Entrenamiento"
            />
            </div>
            <div className="col-md-6">
                <h3 className="fw-bold">Crea tus rutinas</h3>
                <p>Diseña tus propios entrenamientos o selecciona entre planes prediseñados. Personaliza repeticiones y series, ¡tú mandas!</p>
            <Link to="/register" className="btn btn-primary mt-3">¡Únete ahora!</Link>
            </div>
        </section>

        <section className="row align-items-center mb-5 flex-md-row-reverse">
            <div className="col-md-6">
            <img
                src="/img/grafi.jpg"
                className="img-fluid rounded shadow"
                alt="Progreso"
            />
            </div>
            <div className="col-md-6">
            <h3 className="fw-bold">Sigue tu evolución</h3>
            <p>Registra tus pesos y visualiza tu progreso mediante gráficas interactivas. ¡Ve los resultados de tu esfuerzo!</p>
            </div>
        </section>

        <section className="text-center my-5">
            <h3 className="mb-4">¿Listo para comenzar?</h3>
            <Link to="/login" className="btn btn-outline-success btn-lg">Inicia sesión</Link>
        </section>
    </div>
    );
};

export default PageHome;