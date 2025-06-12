// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-5 text-center">
      <div className="container">
        <p className="mb-1">PowerGym</p>
        <small>&copy; {new Date().getFullYear()} Todos los derechos reservados.</small>
      </div>
    </footer>
  );
};

export default Footer;
