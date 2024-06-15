import React, { useContext, useState } from 'react';
import { SupplierContext } from '../contexts/SupplierContext';
import { Helmet } from 'react-helmet';
import { MdEdit, MdDelete } from 'react-icons/md';

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
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Suppliers | Supply Chain Management</title>
      </Helmet>

      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Supplier Information</h2>
        <div className='flex flex-col md:flex-row mb-4'>
          <input
            type='text'
            placeholder='Supplier Name'
            value={newSupplier.name}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, name: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='text'
            placeholder='Contact Person'
            value={newSupplier.contactPerson}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, contactPerson: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='text'
            placeholder='Phone'
            value={newSupplier.phone}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, phone: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='email'
            placeholder='Email'
            value={newSupplier.email}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, email: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          {editingSupplier ? (
            <button
              onClick={handleUpdateSupplier}
              className='bg-orange-500 text-white p-2 px-4 rounded-3xl w-full md:w-auto md:ml-2 hover:bg-orange-700'
            >
              Update Supplier
            </button>
          ) : (
            <button
              onClick={handleAddSupplier}
              className='bg-blue-800 text-white p-2 px-4 rounded-3xl w-full md:w-auto md:ml-2 hover:bg-green-600'
            >
              Add Supplier
            </button>
          )}
        </div>
        <div className='overflow-x-auto mt-10'>
          <table className='min-w-full bg-white'>
            <thead className='bg-blue-100'>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Contact Person</th>
                <th className='py-2 px-4 border-b'>Phone</th>
                <th className='py-2 px-4 border-b'>Email</th>
                <th className='py-2 px-4 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className='py-2 px-4 border-b'>{supplier.name}</td>
                  <td className='py-2 px-4 border-b'>
                    {supplier.contactPerson}
                  </td>
                  <td className='py-2 px-4 border-b'>{supplier.phone}</td>
                  <td className='py-2 px-4 border-b'>{supplier.email}</td>
                  <td className='py-2 px-4 border-b flex space-x-2'>
                    <button
                      onClick={() => handleEditSupplier(supplier)}
                      className='border text-blue-800 bg-gray-300 border-gray-300 p-2 rounded-3xl hover:bg-gray-400 hover:text-blue-800 shadow'
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => removeSupplier(supplier.id)}
                      className='bg-red-500 text-white p-2 rounded-3xl hover:bg-red-700'
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Suppliers;
