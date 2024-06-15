import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Logout</h2>
      <button
        onClick={logout}
        className='bg-blue-800 hover:bg-green-600 text-white p-2 mr-2 mb-2 px-4 rounded-3xl'
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
