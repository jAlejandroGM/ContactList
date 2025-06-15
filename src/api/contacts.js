const url = 'https://playground.4geeks.com/contact/agendas/jAlejandroGM/contacts'

export const getAllContacts = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error loading contacts');
        const data = await response.json();
        return data.contacts || []
    } catch (error) {
        throw error
    }
};

export const getContactByID = async (id) => {
    try {
        const contacts = await getAllContacts();
        const contact = contacts.find(contact => contact.id === parseInt(id));
        
        if (!contact) {
            throw new Error('Contact not found');
        }
        
        return {
            full_name: contact.name,
            email: contact.email,
            address: contact.address,
            phone: contact.phone,
            id: contact.id
        };
    } catch (error) {
        throw error;
    }
};

export const createContact = async (contact) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: contact.full_name,
            email: contact.email,
            address: contact.address,
            phone: contact.phone
        })
    });
    if (!response.ok) throw new Error('Error creating contact');
    return response.json();
};

export const updateContactByID = async (id, contact) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: contact.full_name,
            email: contact.email,
            address: contact.address,
            phone: contact.phone
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) throw new Error('Error updating contact');
    return response.json();
};

export const deleteContactById = async (id) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error deleting contact');
    return true;
};