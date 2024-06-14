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

  const handleAddItem = () => {
    addItem({ ...newItem, id: Date.now() });
    setNewItem({ name: '', sku: '', quantity: 0, location: '' });
  };

  return (
    <>
      <div className='p-4'>
        <h2>Inventory Management</h2>
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
              setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
            }
            className='border p-2 mr-2  rounded-3xl'
          />
          <input
            type='text'
            placeholder='Location'
            value={newItem.location}
            onChange={(e) =>
              setNewItem({ ...newItem, location: e.target.value })
            }
            className='border p-2 mr-2 rounded-3xl'
          />
          <button
            onClick={handleAddItem}
            className='bg-blue-500 text-white p-2 rounded-3xl'
          >
            Add Item
          </button>
        </div>
        <div className='mt-4'>
          {items.map((item) => (
            <div key={item.id} className='border p-4 mb-2 flex justify-between'>
              <div>
                <div>{item.name}</div>
                <div>SKU: {item.sku}</div>
                <div>Quantity: {item.quantity}</div>
                <div>Location: {item.location}</div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className='bg-red-500 text-white p-2 '
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Inventory;
