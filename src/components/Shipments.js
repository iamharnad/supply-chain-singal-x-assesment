import React, { useContext, useState } from 'react';
import { ShipmentContext } from '../contexts/ShipmentContext';

const Shipments = () => {
  const { shipments, addShipment, updateShipment } =
    useContext(ShipmentContext);
  const [newShipment, setNewShipment] = useState({
    origin: '',
    destination: '',
    status: 'In Transit',
    estimatedDelivery: '',
  });
  const [editingShipmentId, setEditingShipmentId] = useState(null);

  const handleAddShipment = () => {
    addShipment({ ...newShipment, id: Date.now() });
    setNewShipment({
      origin: '',
      destination: '',
      status: 'In Transit',
      estimatedDelivery: '',
    });
  };

  const handleEditShipment = (shipment) => {
    setEditingShipmentId(shipment.id);
    setNewShipment({ ...shipment });
  };

  const handleUpdateShipment = () => {
    updateShipment(editingShipmentId, newShipment);
    setEditingShipmentId(null);
    setNewShipment({
      origin: '',
      destination: '',
      status: 'In Transit',
      estimatedDelivery: '',
    });
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Shipment Tracking</h2>
      <div>
        <input
          type='text'
          placeholder='Origin'
          value={newShipment.origin}
          onChange={(e) =>
            setNewShipment({ ...newShipment, origin: e.target.value })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        <input
          type='text'
          placeholder='Destination'
          value={newShipment.destination}
          onChange={(e) =>
            setNewShipment({ ...newShipment, destination: e.target.value })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        <input
          type='date'
          placeholder='Estimated Delivery'
          value={newShipment.estimatedDelivery}
          onChange={(e) =>
            setNewShipment({
              ...newShipment,
              estimatedDelivery: e.target.value,
            })
          }
          className='border p-2 mr-2 rounded-3xl'
        />
        {editingShipmentId ? (
          <button
            onClick={handleUpdateShipment}
            className='bg-orange-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-orange-700'
          >
            Update Shipment
          </button>
        ) : (
          <button
            onClick={handleAddShipment}
            className='bg-blue-800 hover:bg-green-600 text-white p-2 mr-2 mb-2 px-4 rounded-3xl'
          >
            Add Shipment
          </button>
        )}
      </div>
      <div className='mt-4'>
        {shipments.map((shipment) => (
          <div
            key={shipment.id}
            className='border p-4 mb-2 flex flex-col sm:flex-row justify-between items-center'
          >
            <div>
              <div>Shipment ID: {shipment.id}</div>
              <div>Origin: {shipment.origin}</div>
              <div>Destination: {shipment.destination}</div>
              <div>Status: {shipment.status}</div>
              <div>Estimated Delivery: {shipment.estimatedDelivery}</div>
            </div>
            <div className='flex space-x-2'>
              <button
                onClick={() => handleEditShipment(shipment)}
                className='border text-gray-500 border-gray-500 p-2 mr-2 mb-2 px-5 rounded-3xl hover:border-black hover:text-black'
              >
                Edit
              </button>
              <button
                onClick={() =>
                  updateShipment(shipment.id, {
                    ...shipment,
                    status: 'Delivered',
                  })
                }
                className='bg-red-500 text-white p-2 mr-2 mb-2 px-6  rounded-3xl hover:bg-red-800'
              >
                Mark as Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shipments;
