import React, { useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Navigate,
  useNavigate,
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImExit } from 'react-icons/im';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='bg-red-500 text-white p-2 rounded-3xl hover:bg-red-900'
    >
      <ImExit />
    </button>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <nav className='bg-blue-800 p-4 text-white'>
          <div className='container mx-auto flex justify-between items-center'>
            <ul className='flex space-x-4'>
              <AuthContext.Consumer>
                {({ isAuthenticated }) =>
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
                    </>
                  ) : null
                }
              </AuthContext.Consumer>
            </ul>
            <AuthContext.Consumer>
              {({ isAuthenticated }) =>
                isAuthenticated ? (
                  <ul className='flex space-x-4'>
                    <li className='ml-auto'>
                      <LogoutButton />
                    </li>
                  </ul>
                ) : null
              }
            </AuthContext.Consumer>
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
