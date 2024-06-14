import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

import Inventory from './components/Inventory';
import InventoryProvider from './contexts/InventoryContext';
import Shipments from './components/Shipments';
import ShipmentProvider from './contexts/ShipmentContext';
import SupplierProvider from './contexts/SupplierContext';
import Suppliers from './components/Suppliers';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className='bg-blue-800 p-4 text-white'>
          <div className='container mx-auto'>
            <ul className='flex space-x-4'>
              <li>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    isActive ? 'text-white font-bold' : 'hover:text-blue-300'
                  }
                >
                  Inventory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/shipments'
                  className={({ isActive }) =>
                    isActive ? 'text-white font-bold' : 'hover:text-blue-300'
                  }
                >
                  Shipments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/suppliers'
                  className={({ isActive }) =>
                    isActive ? 'text-white font-bold' : 'hover:text-blue-300'
                  }
                >
                  Suppliers
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className='container mx-auto'>
          <Routes>
            <Route
              path='/'
              element={
                <InventoryProvider>
                  <Inventory />
                </InventoryProvider>
              }
            />
            <Route
              path='/shipments'
              element={
                <ShipmentProvider>
                  <Shipments />
                </ShipmentProvider>
              }
            />
            <Route
              path='/suppliers'
              element={
                <SupplierProvider>
                  <Suppliers />
                </SupplierProvider>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
