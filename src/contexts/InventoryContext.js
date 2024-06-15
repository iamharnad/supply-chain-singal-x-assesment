import React, { createContext, useState, useEffect } from 'react';

//context for the inventory
export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  //initialize the inventory state locally
  const [inventory, setInventory] = useState(() => {
    const savedInventory = localStorage.getItem('inventory');
    return savedInventory ? JSON.parse(savedInventory) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  //add items to inventory
  const addItem = (item) => {
    setInventory([...inventory, item]);
  };

  //update items to inventory
  const updateItem = (id, updatedItem) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  };

  //remove items from inventory
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
