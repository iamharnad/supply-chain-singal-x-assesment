import React, { createContext, useState, useEffect } from 'react';

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const addItem = (item) => {
    setInventory([...inventory, item]);
  };

  const updateItem = (id, updatedItem) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const removeItem = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <InventoryContext.Provider
      value={{ inventory, addItem, updateItem, removeItem }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
