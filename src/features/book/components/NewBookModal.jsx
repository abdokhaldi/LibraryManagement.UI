import { useState } from 'react';

export default function NewBookModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [category, setCategory] = useState('Tech');
  const [description, setDescription] = useState('');
  const [copies, setCopies] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !isbn) return;
    onAdd({ title, isbn, category, description, copies });
    setTitle('');
    setIsbn('');
    setCategory('Tech');
    setDescription('');
    setCopies(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center opacity-100 bg-black z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md border-2 border-green-400">
        <h2 className="text-xl mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="Tech">Tech</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
          </select>
          <input
            type="number"
            min="1"
            placeholder="Copies"
            value={copies}
            onChange={(e) => setCopies(parseInt(e.target.value, 10))}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
