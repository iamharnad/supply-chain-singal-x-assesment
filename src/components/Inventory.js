import React, { useContext, useState } from 'react';
import { InventoryContext } from '../contexts/InventoryContext';
import { Helmet } from 'react-helmet';
import { MdEdit, MdDelete } from 'react-icons/md';

const ITEMS_PER_PAGE = 4; // Define the number of items per page

const Inventory = () => {
  const { inventory, addItem, updateItem, removeItem } =
    useContext(InventoryContext);
  const [newItem, setNewItem] = useState({
    name: '',
    sku: '',
    quantity: '',
    location: '',
  });
  const [editingItemId, setEditingItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddItem = () => {
    addItem({ ...newItem, id: Date.now() });
    setNewItem({ name: '', sku: '', quantity: '', location: '' });
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({ ...item });
  };

  const handleUpdateItem = () => {
    updateItem(editingItemId, newItem);
    setEditingItemId(null);
    setNewItem({ name: '', sku: '', quantity: '', location: '' });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = inventory
    ? Math.ceil(inventory.length / ITEMS_PER_PAGE)
    : 1;
  const displayedItems = inventory
    ? inventory.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : [];

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Inventory - Supply Chain Management | Home Page</title>
      </Helmet>
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Inventory Management</h2>
        <div className='flex flex-col md:flex-row mb-4'>
          <input
            type='text'
            placeholder='Item Name'
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='text'
            placeholder='SKU'
            value={newItem.sku}
            onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='number'
            placeholder='Quantity'
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='text'
            placeholder='Warehouse Location'
            value={newItem.location}
            onChange={(e) =>
              setNewItem({ ...newItem, location: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          {editingItemId ? (
            <button
              onClick={handleUpdateItem}
              className='bg-orange-500 text-white p-2 px-4 rounded-3xl w-full md:w-auto md:ml-2 hover:bg-orange-700'
            >
              Update Item
            </button>
          ) : (
            <button
              onClick={handleAddItem}
              className='bg-blue-800 text-white p-2 px-4 rounded-3xl w-full md:w-auto md:ml-2 hover:bg-green-600'
            >
              Add Item
            </button>
          )}
        </div>
        <div className='overflow-x-auto mt-10'>
          <table className='min-w-full bg-white'>
            <thead className='bg-blue-100'>
              <tr>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>SKU</th>
                <th className='py-2 px-4 border-b'>Quantity</th>
                <th className='py-2 px-4 border-b'>Location</th>
                <th className='py-2 px-4 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((item) => (
                <tr key={item.id}>
                  <td className='py-2 px-4 border-b'>{item.name}</td>
                  <td className='py-2 px-4 border-b'>{item.sku}</td>
                  <td className='py-2 px-4 border-b'>{item.quantity}</td>
                  <td className='py-2 px-4 border-b'>{item.location}</td>
                  <td className='py-2 px-4 border-b flex space-x-2'>
                    <button
                      onClick={() => handleEditItem(item)}
                      className='border text-blue-800 bg-gray-300 border-gray-300 p-2 rounded-3xl hover:bg-gray-400 hover:text-blue-800 shadow'
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
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
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='bg-gray-300 text-black px-4 p-2 mx-2 disabled:opacity-50 rounded-3xl'
          >
            Previous
          </button>
          <span className='m-2'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='bg-gray-300 text-black p-2 px-4 disabled:opacity-50 rounded-3xl'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Inventory;
