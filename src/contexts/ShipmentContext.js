import React, { createContext, useState, useEffect } from 'react';

export const ShipmentContext = createContext();

const ShipmentProvider = ({ children }) => {
  const [shipments, setShipments] = useState(() => {
    const savedShipments = localStorage.getItem('shipments');
    return savedShipments ? JSON.parse(savedShipments) : [];
  });

  useEffect(() => {
    localStorage.setItem('shipments', JSON.stringify(shipments));
  }, [shipments]);

  const addShipment = (shipment) => {
    setShipments([...shipments, shipment]);
  };

  const updateShipment = (id, updatedShipment) => {
    setShipments(
      shipments.map((shipment) =>
        shipment.id === id ? { ...shipment, ...updatedShipment } : shipment
      )
    );
  };

  return (
    <ShipmentContext.Provider
      value={{ shipments, addShipment, updateShipment }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export default ShipmentProvider;
