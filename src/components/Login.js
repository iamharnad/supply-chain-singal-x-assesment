import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    navigate('/inventory');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-200 p-6 rounded-3xl shadow-md w-80'
      >
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border p-2 mb-4 w-full rounded-3xl'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border p-2 mb-4 w-full rounded-3xl'
        />
        <button
          type='submit'
          className='bg-blue-800 text-white p-2 w-full rounded-3xl'
        >
          Login
        </button>
        <div className='mt-4'>
          <Link to='/signup' className='text-gray-500 hover:underline'>
            Don't have an account?{' '}
            <span className='text-blue-800 font-bold'>Sign up</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
