
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { deleteContactById, getAllContacts } from "../api/contacts";
import { useEffect } from "react";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {

  const { store, dispatch } = useGlobalReducer()

  useEffect(() => {
    cargarContactos();
  }, []);

  const cargarContactos = async () => {
    try {
      const data = await getAllContacts();
      dispatch({
        type: "LOAD_CONTACTS",
        payload: data
      });
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await deleteContactById(id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };


  return (
    <div className="container">
      <Link to="/form" className="btn btn-success mt-4">
        Add Contact<i className="ri-add-line ms-2"></i>
      </Link>
      <div className="row mt-3">
        {Array.isArray(store.contacts) &&
          store.contacts.map((contact) => (
            <div key={contact.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <ContactCard
                contact={contact}
                eliminarContacto={eliminarContacto}
              />
            </div>
          ))}
      </div>

    </div>
  );
};
