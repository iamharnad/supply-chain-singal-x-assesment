import React, { createContext, useState, useEffect } from 'react';

export const SupplierContext = createContext();

const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState(() => {
    const savedSuppliers = localStorage.getItem('suppliers');
    return savedSuppliers ? JSON.parse(savedSuppliers) : [];
  });

  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  const addSupplier = (supplier) => setSuppliers([...suppliers, supplier]);
  const updateSupplier = (id, data) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...data } : supplier
      )
    );
  };
  const removeSupplier = (id) =>
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));

  return (
    <SupplierContext.Provider
      value={{ suppliers, addSupplier, updateSupplier, removeSupplier }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export default SupplierProvider;
