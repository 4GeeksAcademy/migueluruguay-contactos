const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: [] // Espacio para almacenar contactos obtenidos de la API
        },
        actions: {
            obtenerContactos: () => {
                fetch("https://playground.4geeks.com/contact/agendas/migueluruguay/contacts")
                    .then((respuesta) => {
                        if (respuesta.status === 404) {
                            getActions().crearUsuario();
                        }
                        return respuesta.ok ? respuesta.json() : null;
                    })
                    .then((datos) => {
                        if (datos) setStore({ listContacts: datos.contacts });
                    })
                    .catch((error) => console.error("Error al obtener contactos:", error));
            },

            crearUsuario: () => {
                fetch("https://playground.4geeks.com/contact/agendas/migueluruguay", {
                    method: "POST"
                }).catch((error) => console.error("Error al crear usuario:", error));
            },

            crearContacto: (contacto) => {
                fetch("https://playground.4geeks.com/contact/agendas/migueluruguay/contacts", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contacto)
                })
                .then((respuesta) => respuesta.json())
                .then((datos) => {
                    getActions().agregarContactoLista(datos);
                })
                .catch((error) => console.error("Error al crear contacto:", error));
            },

            agregarContactoLista: (contacto) => {
                const { listContacts } = getStore();
                setStore({ listContacts: [...listContacts, contacto] });
            },

            eliminarContacto: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/migueluruguay/contacts/${id}`, {
                    method: "DELETE",
                })
                .then((respuesta) => {
                    if (respuesta.ok) {
                        const { listContacts } = getStore();
                        setStore({ listContacts: listContacts.filter(contacto => contacto.id !== id) });
                    }
                })
                .catch((error) => console.error("Error al eliminar contacto:", error));
            },

            editarContacto: (id, datosActualizados) => {
                fetch(`https://playground.4geeks.com/contact/agendas/migueluruguay/contacts/${id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datosActualizados)
                })
                .then((respuesta) => respuesta.json())
                .then((contactoActualizado) => {
                    const { listContacts } = getStore();
                    setStore({ 
                        listContacts: listContacts.map(contacto => 
                            contacto.id === id ? contactoActualizado : contacto
                        )
                    });
                })
                .catch((error) => console.error("Error al editar contacto:", error));
            }
        }
    };
};
export default getState;
