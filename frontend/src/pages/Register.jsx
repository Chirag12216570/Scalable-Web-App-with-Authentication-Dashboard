import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../api/axios';
import { validateEmail, validatePassword, validateUsername } from '../utils/validate';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateUsername(form.username) || !validateEmail(form.email) || !validatePassword(form.password)) {
      setError('Invalid input');
      toast.error('Invalid input');
      return;
    }
    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 p-4">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <form
        className="bg-gray-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md border border-gray-700"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl mb-6 font-bold text-center text-white">
          Register
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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <input
          type="text"
          name="name"
          placeholder="Name (optional)"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors transform hover:scale-105"
        >
          Register
        </button>
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-blue-400 hover:underline hover:text-blue-300 transition-colors"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
