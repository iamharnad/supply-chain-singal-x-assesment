import React, { useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
} from 'react-router-dom';
import Inventory from './components/Inventory';
import InventoryProvider from './contexts/InventoryContext';
import Shipments from './components/Shipments';
import ShipmentProvider from './contexts/ShipmentContext';
import SupplierProvider from './contexts/SupplierContext';
import Suppliers from './components/Suppliers';
import Signup from './components/Signup';
import Login from './components/Login';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav className='bg-blue-800 p-4 text-white'>
          <div className='container mx-auto flex justify-between'>
            <ul className='flex space-x-4'>
              <AuthContext.Consumer>
                {({ isAuthenticated, logout }) =>
                  isAuthenticated ? (
                    <>
                      <li>
                        <NavLink
                          to='/inventory'
                          className={({ isActive }) =>
                            isActive
                              ? 'text-white font-bold'
                              : 'hover:text-blue-300'
                          }
                        >
                          Inventory
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/shipments'
                          className={({ isActive }) =>
                            isActive
                              ? 'text-white font-bold'
                              : 'hover:text-blue-300'
                          }
                        >
                          Shipments
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to='/suppliers'
                          className={({ isActive }) =>
                            isActive
                              ? 'text-white font-bold'
                              : 'hover:text-blue-300'
                          }
                        >
                          Suppliers
                        </NavLink>
                      </li>
                      <li className='ml-auto'>
                        <button
                          onClick={logout}
                          className='bg-red-500 text-white p-2 rounded-3xl'
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : null
                }
              </AuthContext.Consumer>
            </ul>
          </div>
        </nav>
        <div className='container mx-auto'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/inventory'
              element={
                <ProtectedRoute>
                  <InventoryProvider>
                    <Inventory />
                  </InventoryProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path='/shipments'
              element={
                <ProtectedRoute>
                  <ShipmentProvider>
                    <Shipments />
                  </ShipmentProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path='/suppliers'
              element={
                <ProtectedRoute>
                  <SupplierProvider>
                    <Suppliers />
                  </SupplierProvider>
                </ProtectedRoute>
              }
            />
            <Route path='/' element={<Navigate to='/login' />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
