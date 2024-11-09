import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext.js";
import AgregarContacto from "./agregarcontacto";

const Contactos = () => {
    const { store } = useContext(Context);

    return (
        <div className="container">
            <h1>Lista de Contactos</h1>
            <div className="d-flex justify-content-end mb-3">
                <Link to="/agregarcontacto">
                    <button className="btn btn-success">Agregar Contacto</button>
                </Link>
            </div>
            <ul className="list-group">
                {store.listContacts.map(contacto => (
                    <AgregarContacto key={contacto.id} contact={contacto} />
                ))}
            </ul>
        </div>
    );
};

export default Contactos;
