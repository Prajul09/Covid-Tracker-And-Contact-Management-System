import React, { useState, useEffect } from 'react';
import EditContactScreen from './EditContactScreen';

const Contact = ({ contacts, setContacts }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    status: 'active',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showEditScreen, setShowEditScreen] = useState(false);

  useEffect(() => {
    // Save contacts to localStorage whenever the contacts state changes
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleCreateContact = () => {
    setShowForm(true);
    setFormData({
      firstName: '',
      lastName: '',
      status: 'active',
    });
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation: Check if all fields are filled
    if (formData.firstName.trim() === '' || formData.lastName.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    if (editIndex !== null) {
      // If editIndex is not null, update the existing contact
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = formData;
      setContacts(updatedContacts);
    } else {
      // Save contact
      setContacts([...contacts, formData]);
    }

    // Reset form data for the next contact
    setFormData({
      firstName: '',
      lastName: '',
      status: 'active',
    });

    // Hide the form after saving
    setShowForm(false);
    setEditIndex(null);
  };

  const handleEditContact = (index) => {
    setFormData(contacts[index]);
    setEditIndex(index);
    setShowEditScreen(true);
  };

  const handleSaveEditedContact = (editedContact) => {
    const updatedContacts = [...contacts];
    updatedContacts[editIndex] = editedContact;
    setContacts(updatedContacts);
    setShowEditScreen(false);
  };

  const handleCancelEdit = () => {
    setShowEditScreen(false);
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  return (
    <div  className="p-4 mx-auto max-w-lg md:ml-0 md:max-w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Screen</h2>
      {showForm ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Create Contact</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div className="mb-4">
              <p className="block text-gray-700 text-sm font-bold mb-2">Status</p>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="status"
                    value="active"
                    checked={formData.status === 'active'}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === 'inactive'}
                    onChange={handleChange}
                  />
                  <span className="ml-2">Inactive</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full md:w-auto"
                type="submit"
              >
                Save Contact
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-20 text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full md:w-auto"
            onClick={handleCreateContact}
          >
            Create Button
          </button>
          {contacts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {contacts.map((contact, index) => (
                <div key={index} className="border border-solid border-slate-600 p-4 flex flex-col">
                  <h2 className="text-gray-500 mb-4 text-xl">
                    Name: {contact.firstName} {contact.lastName}
                  </h2>
                  <p>Status: {contact.status}</p>
                  <div className="flex flex-wrap justify-center mt-4 space-x-2">
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 w-full md:w-auto"
                      onClick={() => handleEditContact(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full md:w-auto"
                      onClick={() => handleDeleteContact(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {contacts.length === 0 && (
            <div className="mt-8 py-3 border border-solid border-slate-600">
              <h2 className="text-gray-500 mb-4 text-xl">
                No contacts found, please add a contact.
              </h2>
            </div>
          )}
        </div>
      )}
      {showEditScreen && (
        <EditContactScreen
          contact={contacts[editIndex]}
          onSave={handleSaveEditedContact}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default Contact;


