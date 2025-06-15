import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, getContactByID, updateContactByID } from "../api/contacts";

export const ContactForm = () => {

    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const { id } = useParams();
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            cargarContacto();
        }
    }, [id]);

    const cargarContacto = async () => {
        try {
            const data = await getContactByID(id);
            setContact(data)
        } catch (error) {
            console.error("Error loading contact:", error);
            navigate("/contacts")
        }
    }

    const crearContacto = async (e) => {
        e.preventDefault();
        try {
            let contactoGuardado;
            if (id) {
                contactoGuardado = await updateContactByID(id, contact);
                dispatch({ type: "UPDATE_CONTACT", payload: contactoGuardado });
            } else {
                contactoGuardado = await createContact(contact);
                dispatch({ type: "ADD_CONTACT", payload: contactoGuardado });
            }
            navigate("/contacts");
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    const guardarCambio = (e) => {
        const { name, value } = e.target;
        setContact(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <form onSubmit={crearContacto} className="bg-white p-4 rounded shadow">
                        <h2 className="mb-3 text-center">
                            {id ? "Editar contacto" : "Agregar nuevo contacto"}
                        </h2>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="full_name"
                                name="full_name"
                                value={contact.full_name}
                                onChange={guardarCambio}
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={contact.email}
                                onChange={guardarCambio}
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={contact.phone}
                                onChange={guardarCambio}
                                placeholder="Enter phone"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={contact.address}
                                onChange={guardarCambio}
                                placeholder="Enter address"
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary">Save Contact</button>
                            <Link to="/contacts"><span>or get back to contacts</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};