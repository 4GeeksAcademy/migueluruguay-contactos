// Importamos React para crear componentes
import React from 'react';
import { Link } from 'react-router-dom';

// Función que representa la barra de navegación
const Navbar = () => {
    return (
        <nav>
            {/* Enlace a la página principal */}
            <Link to="/">Inicio</Link>
            {/* Enlace a la lista de contactos */}
            <Link to="/contactos">Contactos</Link>
        </nav>
    );
};

export default Navbar;