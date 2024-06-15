import React, { useContext, useState } from 'react';
import { InventoryContext } from '../contexts/InventoryContext';
import { Helmet } from 'react-helmet';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

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

  // Ensure inventory is defined and is an array before accessing length
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
        <div>
          <input
            type='text'
            placeholder='Item Name'
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className='border p-2 mr-2 rounded-3xl'
          />
          <input
            type='text'
            placeholder='SKU'
            value={newItem.sku}
            onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
            className='border p-2 mr-2 rounded-3xl'
          />
          <input
            type='number'
            placeholder='Quantity'
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
            className='border p-2 mr-2 rounded-3xl'
          />
          <input
            type='text'
            placeholder='Warehouse Location'
            value={newItem.location}
            onChange={(e) =>
              setNewItem({ ...newItem, location: e.target.value })
            }
            className='border p-2 mr-2 rounded-3xl'
          />
          {editingItemId ? (
            <button
              onClick={handleUpdateItem}
              className='bg-orange-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-orange-700'
            >
              Update Item
            </button>
          ) : (
            <button
              onClick={handleAddItem}
              className='bg-blue-800 hover:bg-green-600 text-white p-2 mr-2 mb-2 px-4 rounded-3xl'
            >
              Add Item
            </button>
          )}
        </div>
        <div className='mt-4'>
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className='border p-4 mb-2 flex flex-col sm:flex-row justify-between items-center'
            >
              <div>
                <div>Name: {item.name}</div>
                <div>SKU: {item.sku}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Location: {item.location}</div>
              </div>
              <div className='flex space-x-2'>
                <button
                  onClick={() => handleEditItem(item)}
                  className='border text-blue-800 bg-gray-300 border-gray-300 p-2 mr-2 mb-2 px-5 rounded-3xl hover:bg-gray-400 hover:text-blue-800 shadow'
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className='bg-red-500 text-white p-2 mr-2 mb-2 px-5  rounded-3xl'
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='bg-gray-300 text-black p-2 mx-2'
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='bg-gray-300 text-black p-2 mx-2'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Inventory;
