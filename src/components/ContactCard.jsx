import { useState } from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, eliminarContacto }) => {

    const [showModal, setShowModal] = useState(false);

    const deleteContact = () => {
        setShowModal(false);
        eliminarContacto(contact.id);
    };
    return (
        <>
            <div className="card h-100">
                <div className="card-body d-flex flex-column shadow">
                    <h5 className="card-title text-truncate">{contact.name}</h5>
                    <div className="flex-grow-1">
                        <p className="card-text mb-1">
                            <i className="ri-mail-line me-2"></i>
                            <span className="text-truncate d-inline-block w-75">{contact.email}</span>
                        </p>
                        <p className="card-text mb-1">
                            <i className="ri-phone-line me-2"></i>
                            <span>{contact.phone}</span>
                        </p>
                        <p className="card-text mb-1">
                            <i className="ri-map-pin-line me-2"></i>
                            <span>{contact.address}</span>
                        </p>
                    </div>
                    <div className="d-flex justify-content-end gap-2 mt-auto">
                        <Link
                            to={`/form/${contact.id}`}
                            className="btn btn-warning btn-sm">
                            <i className="ri-edit-line"></i>
                        </Link>
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-danger btn-sm">
                            <i className="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${showModal ? 'show' : ''}`}
                style={{ display: showModal ? 'block' : 'none' }}
                tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Eliminar Contacto</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                                aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            Seguro(a) que deseas eliminar a {contact.name}?
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)}>
                                No, me arrepiento
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteContact}>
                                Quémenlo!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </>
    );
};