import React, { useContext, useState } from 'react';
import { ShipmentContext } from '../contexts/ShipmentContext';
import { Helmet } from 'react-helmet';
import { MdEdit } from 'react-icons/md';
import { FaCheck, FaClock } from 'react-icons/fa';

const ITEMS_PER_PAGE = 4; // Define the number of items per page

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
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(shipments.length / ITEMS_PER_PAGE);
  const displayedItems = shipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Shipments | Supply Chain Management</title>
      </Helmet>
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Shipment Tracking</h2>
        <div className='flex flex-col md:flex-row mb-4'>
          <input
            type='text'
            placeholder='Origin'
            value={newShipment.origin}
            onChange={(e) =>
              setNewShipment({ ...newShipment, origin: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <input
            type='text'
            placeholder='Destination'
            value={newShipment.destination}
            onChange={(e) =>
              setNewShipment({ ...newShipment, destination: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
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
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          />
          <select
            value={newShipment.status}
            onChange={(e) =>
              setNewShipment({ ...newShipment, status: e.target.value })
            }
            className='border p-2 mb-2 md:mb-0 md:mr-2 rounded-3xl w-full md:w-auto'
          >
            <option value='In Transit'>In Transit</option>
            <option value='Delayed'>Delayed</option>
            <option value='Delivered'>Delivered</option>
          </select>
          {editingShipmentId ? (
            <button
              onClick={handleUpdateShipment}
              className='bg-orange-500 text-white p-2 px-4 mb-2 md:mb-0 md:ml-2 rounded-3xl w-full md:w-auto hover:bg-orange-700'
            >
              Update Shipment
            </button>
          ) : (
            <button
              onClick={handleAddShipment}
              className='bg-blue-800 text-white p-2 px-4 mb-2 md:mb-0 md:ml-2 rounded-3xl w-full md:w-auto hover:bg-green-600'
            >
              Add Shipment
            </button>
          )}
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>ID</th>
                <th className='py-2 px-4 border-b'>Origin</th>
                <th className='py-2 px-4 border-b'>Destination</th>
                <th className='py-2 px-4 border-b'>Status</th>
                <th className='py-2 px-4 border-b'>Estimated Delivery</th>
                <th className='py-2 px-4 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((shipment) => (
                <tr key={shipment.id}>
                  <td className='py-2 px-4 border-b'>{shipment.id}</td>
                  <td className='py-2 px-4 border-b'>{shipment.origin}</td>
                  <td className='py-2 px-4 border-b'>{shipment.destination}</td>
                  <td className='py-2 px-4 border-b'>{shipment.status}</td>
                  <td className='py-2 px-4 border-b'>
                    {shipment.estimatedDelivery}
                  </td>
                  <td className='py-2 px-4 border-b flex space-x-2'>
                    <button
                      onClick={() => handleEditShipment(shipment)}
                      className='border text-blue-800 bg-gray-300 border-gray-300 p-2 rounded-3xl hover:bg-gray-400 hover:text-blue-800 shadow'
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() =>
                        updateShipment(shipment.id, {
                          ...shipment,
                          status: 'Delivered',
                        })
                      }
                      className='bg-green-500 text-white p-2 rounded-3xl hover:bg-green-700'
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() =>
                        updateShipment(shipment.id, {
                          ...shipment,
                          status: 'Delayed',
                        })
                      }
                      className='bg-red-500 text-white p-2 rounded-3xl hover:bg-red-700'
                    >
                      <FaClock />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center mt-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='bg-gray-300 text-black px-4 p-2 mx-2 disabled:opacity-50 rounded-3xl'
          >
            Previous
          </button>
          <span className='m-2'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='bg-gray-300 text-black px-4 p-2 mx-2 disabled:opacity-50 rounded-3xl'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Shipments;
