import React, { createContext, useState, useEffect } from 'react';

//context for supplier
export const SupplierContext = createContext();

const SupplierProvider = ({ children }) => {
  //initialize the supplier state locally
  const [suppliers, setSuppliers] = useState(() => {
    const savedSuppliers = localStorage.getItem('suppliers');
    return savedSuppliers ? JSON.parse(savedSuppliers) : [];
  });

  useEffect(() => {
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  //add supplier
  const addSupplier = (supplier) => setSuppliers([...suppliers, supplier]);
  const updateSupplier = (id, data) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...data } : supplier
      )
    );
  };

  //remove supplie
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
