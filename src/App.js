import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Inventory from './components/Inventory';
import InventoryProvider from './contexts/InventoryContext';
import Shipments from './components/Shipments';
import ShipmentProvider from './contexts/ShipmentContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className='bg-blue-800 p-4 text-white'>
          <div className='container mx-auto'>
            <ul className='flex space-x-4'>
              <li>
                <Link to='/'>Inventory</Link>
              </li>
              <li>
                <Link to='/shipments'>Shipments</Link>
              </li>
              <li>
                <Link to='/suppliers'>Suppliers</Link>
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
            <Route path='/suppliers' element={<Shipments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
