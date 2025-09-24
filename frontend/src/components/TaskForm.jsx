import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TaskForm = ({ onSubmit, initial = {}, submitLabel = 'Add Task' }) => {
  const [title, setTitle] = useState(initial.title || '');
  const [description, setDescription] = useState(initial.description || '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      toast.error('Title is required');
      return;
    }
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <form className="mb-4 text-black" onSubmit={handleSubmit}>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded w-full mb-2 text-black bg-white placeholder-gray-500"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded w-full mb-2 text-black bg-white placeholder-gray-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
