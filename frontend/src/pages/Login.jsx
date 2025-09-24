import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/axios';
import { validateUsername, validatePassword } from '../utils/validate';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(form.username) || !validatePassword(form.password)) {
      setError('Invalid username or password');
      toast.error('Invalid username or password');
      return;
    }
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 p-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
  <form
    className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md border border-gray-700"
    onSubmit={handleSubmit}
  >
    <h2 className="text-3xl mb-6 font-bold text-center text-white">
      Login
    </h2>
    {error && <div className="text-red-400 mb-4 text-center">{error}</div>}
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={form.username}
      onChange={handleChange}
      className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      className="w-full p-3 mb-6 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    />
    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
    >
      Login
    </button>
    <div className="mt-6 text-center">
      <a
        href="/register"
        className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
      >
        Register
      </a>
    </div>
  </form>
</div>
  );
};

export default Login;
