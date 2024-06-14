import React, { useContext, useState } from 'react';
import { SupplierContext } from '../contexts/SupplierContext';

const Suppliers = () => {
  const { suppliers, addSupplier, updateSupplier, removeSupplier } =
    useContext(SupplierContext);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
  });
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleAddSupplier = () => {
    addSupplier({ ...newSupplier, id: Date.now() });
    setNewSupplier({ name: '', contactPerson: '', phone: '', email: '' });
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier(supplier);
  };

  const handleUpdateSupplier = () => {
    updateSupplier(editingSupplier.id, newSupplier);
    setEditingSupplier(null);
    setNewSupplier({ name: '', contactPerson: '', phone: '', email: '' });
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Supplier Information</h2>
      <div>
        <input
          type='text'
          placeholder='Supplier Name'
          value={newSupplier.name}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, name: e.target.value })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        <input
          type='text'
          placeholder='Contact Person'
          value={newSupplier.contactPerson}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, contactPerson: e.target.value })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        <input
          type='text'
          placeholder='Phone'
          value={newSupplier.phone}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, phone: e.target.value })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        <input
          type='email'
          placeholder='Email'
          value={newSupplier.email}
          onChange={(e) =>
            setNewSupplier({ ...newSupplier, email: e.target.value })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        {editingSupplier ? (
          <button
            onClick={handleUpdateSupplier}
            className='bg-orange-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-orange-700'
          >
            Update Supplier
          </button>
        ) : (
          <button
            onClick={handleAddSupplier}
            className='bg-blue-800 hover:bg-green-600 text-white p-2 mr-2 mb-2 px-4 rounded-3xl'
          >
            Add Supplier
          </button>
        )}
      </div>
      <div className='mt-4'>
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className='border p-4 mb-2 flex flex-col sm:flex-row justify-between items-center'
          >
            <div>
              <div>Name: {supplier.name}</div>
              <div>Contact Person: {supplier.contactPerson}</div>
              <div>Phone: {supplier.phone}</div>
              <div>Email: {supplier.email}</div>
            </div>
            {editingSupplier ? (
              <button
                onClick={handleUpdateSupplier}
                className='bg-orange-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-orange-700'
              >
                Update Supplier
              </button>
            ) : (
              <div className='flex space-x-2'>
                <button
                  onClick={() => handleEditSupplier(supplier)}
                  className='border text-blue-800 bg-gray-300 border-gray-300 p-2 mr-2 mb-2 px-5 rounded-3xl hover:bg-gray-400 hover:text-blue-800 shadow'
                >
                  Edit
                </button>
                <button
                  onClick={() => removeSupplier(supplier.id)}
                  className='bg-red-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-red-800'
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suppliers;
