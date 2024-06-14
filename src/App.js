import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Inventory from './components/Inventory';
import InventoryProvider from './contexts/InventoryContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container mx-auto'>
          <nav className='bg-gray-800 p-4 text-white'>
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
          </nav>
          <Routes>
            <Route
              path='/'
              element={
                <InventoryProvider>
                  <Inventory />
                </InventoryProvider>
              }
            />
            <Route path='/inventory' element={<Inventory />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
