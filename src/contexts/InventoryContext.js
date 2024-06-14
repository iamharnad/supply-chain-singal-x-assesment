import React from 'react';
import { createContext, useState, useEffect } from 'react';

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('inventoryItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems([...items, item]);
  const updateItem = (id, data) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  };
  const removeItem = (id) => setItems(items.filter((item) => item.id !== id));

  return (
    <InventoryContext.Provider
      value={{ items, addItem, updateItem, removeItem }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
