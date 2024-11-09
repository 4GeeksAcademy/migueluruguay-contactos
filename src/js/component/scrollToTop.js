// Importamos React y useEffect para manejar la funcionalidad de scroll
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente para mover la vista hacia arriba al cambiar de página
const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        // Desplaza la página hacia el inicio cada vez que la ruta cambia
        window.scrollTo(0, 0);
    }, [location]);

    return null;
};

export default ScrollToTop;
