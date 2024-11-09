import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";

const AgregarContacto = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [direccion, setDireccion] = useState("");

    useEffect(() => {
        if (id && store.listContacts.length > 0) {
            const contacto = store.listContacts.find(c => c.id === id);
            setNombre(contacto.name);
            setTelefono(contacto.phone);
            setCorreo(contacto.email);
            setDireccion(contacto.address);
        }
    }, [id, store.listContacts]);

    const guardarContacto = (e) => {
        e.preventDefault();
        if (!nombre || !telefono || !correo || !direccion) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const nuevoContacto = { name: nombre, phone: telefono, email: correo, address: direccion };

        if (!id) actions.createContact(nuevoContacto);
        else actions.editContact(id, nuevoContacto);

        navigate("/");
    };

    return (
        <div className="container">
            <h1>{id ? `Editar Contacto: ${nombre}` : "Añadir Contacto"}</h1>
            <form onSubmit={guardarContacto}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input type="text" className="form-control" id="nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="correo" onChange={(e) => setCorreo(e.target.value)} value={correo} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" id="telefono" onChange={(e) => setTelefono(e.target.value)} value={telefono} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" onChange={(e) => setDireccion(e.target.value)} value={direccion} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
            <Link to="/">Volver a Contactos</Link>
        </div>
    );
};

export default AgregarContacto;
