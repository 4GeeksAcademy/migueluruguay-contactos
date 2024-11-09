import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from "../store/appContext.js";

const EditarContacto = () => {
    const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    let navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del contacto desde la URL

    useEffect(() => {
        // Buscar el contacto por ID y establecer los valores iniciales
        const contact = store.contacts.find(contact => contact.id === id);
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setAddress(contact.address);
        }
    }, [id, store.contacts]);

    const handleUpdateContact = async (e) => {
        e.preventDefault();
        
        // Llamar a la acción para actualizar el contacto
        try {
            await actions.updateContact(id, { name, email, phone, address });
            navigate("/"); // Redirigir a la lista de contactos
        } catch (error) {
            console.error("Error al actualizar el contacto:", error);
            
    }

    return (
        <div className="container">
            <h1 className="text-center">Actualizar Contacto</h1>

            <form className="container" onSubmit={handleUpdateContact}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombre" 
                        placeholder="Nombre completo" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="correo" 
                        placeholder="Correo electrónico" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="telefono" 
                        placeholder="Número de teléfono" 
                        onChange={(e) => setPhone(e.target.value)} 
                        value={phone} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="direccion" 
                        placeholder="Dirección" 
                        onChange={(e) => setAddress(e.target.value)} 
                        value={address} 
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary">Actualizar Contacto</button>
                </div>
            </form>

            <Link to="/" aria-label="Volver a la lista de contactos">
                <button className="btn btn-secondary">Volver a Contacts</button>
            </Link>
        </div>
    )
}

export default EditarContacto;
