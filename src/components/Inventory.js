import React from 'react';
import { useContext, useState } from 'react';
import { InventoryContext } from '../contexts/InventoryContext';

const Inventory = () => {
  const { items, addItem, updateItem, removeItem } =
    useContext(InventoryContext);
  const [newItem, setNewItem] = useState({
    name: '',
    sku: '',
    quantity: 0,
    location: '',
  });
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    addItem({ ...newItem, id: Date.now() });
    setNewItem({ name: '', sku: '', quantity: 0, location: '' });
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem(item);
  };

  const handleUpdateItem = () => {
    updateItem(editingItem.id, newItem);
    setEditingItem(null);
    setNewItem({ name: '', sku: '', quantity: 0, location: '' });
  };

  return (
    <>
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Inventory Management</h2>
        <div className='flex flex-wrap mb-4'>
          <input
            type='text'
            placeholder='Item Name'
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className='border p-2 mr-2 mb-2 rounded-3xl w-full sm:w-auto'
          />
          <input
            type='text'
            placeholder='SKU'
            value={newItem.sku}
            onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
            className='border p-2 mr-2 mb-2 rounded-3xl w-full sm:w-auto'
          />
          <input
            type='number'
            placeholder='Quantity'
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
            className='border p-2 mr-2 mb-2 rounded-3xl w-full sm:w-auto'
          />
          <input
            type='text'
            placeholder='Location'
            value={newItem.location}
            onChange={(e) =>
              setNewItem({ ...newItem, location: e.target.value })
            }
            className='border p-2 mr-2 mb-2 rounded-3xl w-full sm:w-auto'
          />
          {editingItem ? (
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
          {items.map((item) => (
            <div
              key={item.id}
              className='border p-4 mb-2 flex flex-col sm:flex-row justify-between items-center'
            >
              <div className='mb-2 sm:mb-0'>
                <div>{item.name}</div>
                <div>SKU: {item.sku}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Location: {item.location}</div>
              </div>
              <div className='flex space-x-2'>
                <button
                  onClick={() => handleEditItem(item)}
                  className='border text-blue-800 bg-gray-300 border-gray-300 p-2 mr-2 mb-2 px-5 rounded-3xl hover:bg-gray-400 hover:text-blue-800 shadow'
                >
                  Edit
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className='bg-red-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-red-800'
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inventory;
