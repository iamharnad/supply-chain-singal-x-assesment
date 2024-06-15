import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Logged out Successfully | Logout</title>
      </Helmet>
      <div className='p-4'>
        <h2 className='text-xl font-bold mb-4'>Logout</h2>
        <button
          onClick={logout}
          className='bg-blue-800 hover:bg-green-600 text-white p-2 mr-2 mb-2 px-4 rounded-3xl'
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
