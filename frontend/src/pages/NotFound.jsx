import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-lg">Page not found.</p>
    <a href="/" className="mt-4 text-blue-600 hover:underline" onClick={() => toast.info('Redirecting to Home...')}>Go Home</a>
  </div>
);

export default NotFound;
