import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  //state to manage username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);//get login function from authcontext
  const navigate = useNavigate();

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!username || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      login(username, password);
      toast.success('Login successful!');
      navigate('/inventory');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-6 rounded-3xl shadow-md w-80'
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
