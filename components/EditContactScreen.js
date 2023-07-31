import React from 'react';

const EditContactScreen = ({ contact, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(contact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="mt-8 p-4 mx-auto max-w-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Contact Screen</h2>
      <form className="flex flex-col">
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
        <div className="flex flex-col justify-center items-center mt-4 md:flex-row md:justify-center md:items-center">
            <div className="md:w-auto">
                <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full"
                onClick={handleSave}
                >
                Save
                </button>
            </div>
            <div className="md:w-auto mt-4 md:mt-0 md:ml-4">
                <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
                onClick={onCancel}
                >
                Cancel
                </button>
            </div>
        </div>
    </form>
    </div>
  );
};

export default EditContactScreen;






