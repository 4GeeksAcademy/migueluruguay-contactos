import React from "react";
import { setContext } from 'react';

const getState = ({ getStore, getActions, setStore }) => { 
    return {
        store: {
            listContacts: []
        },
        actions: {
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/migueluruguay", {
                    method: "POST",
                })
                .then(response => response.json())
                .catch(error => console.error("Error al crear usuario:", error));
            },

            getInfoContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/migueluruguay/contacts", { method: "GET" })
                .then(response => {
                    if (response.status === 404) {
                        getActions().createUser();
                    }
                    if (response.ok) return response.json();
                })
                .then(data => {
                    if (data) setStore({ listContacts: data.contacts });
                })
                .catch(error => console.error("Error al obtener contactos:", error));
            },

            createContact: (contacto) => {
                fetch("https://playground.4geeks.com/contact/agendas/migueluruguay/contacts", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contacto)
                })
                .then(response => response.json())
                .then(data => getActions().addContactToList(data))
                .catch(error => console.error("Error al crear contacto:", error));
            },

            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/migueluruguay/contacts/${id}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        const updatedContacts = getStore().listContacts.filter(contact => contact.id !== id);
                        setStore({ listContacts: updatedContacts });
                    }
                })
                .catch(error => console.error("Error al eliminar contacto:", error));
            },

            editContact: (id, contacto) => {
                fetch(`https://playground.4geeks.com/contact/agendas/migueluruguay/contacts/${id}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contacto)
                })
                .then(response => response.ok && response.json())
                .then(data => {
                    if (data) {
                        const updatedContacts = getStore().listContacts.map(contact => 
                            contact.id === id ? data : contact
                        );
                        setStore({ listContacts: updatedContacts });
                    }
                })
                .catch(error => console.error("Error al editar contacto:", error));
            },
        },
    };
};

export default getState;
