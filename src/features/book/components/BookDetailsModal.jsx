import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function BookDetailsModal({ isOpen, onClose, book, copies, onAddCopy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const itemsPerPage = 5;

  if (!isOpen || !book) return null;

  const filteredCopies = copies.filter(copy =>
    copy.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCopies.length / itemsPerPage);
  const paginatedCopies = filteredCopies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black opacity-100 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-6xl max-h-[80vh] overflow-y-auto border-green-400 border-2">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">"{book.title}" Details</h2>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={numberOfCopies}
                onChange={(e) => setNumberOfCopies(parseInt(e.target.value, 10) || 1)}
                className="w-16 p-2 border rounded"
              />
              <button
                onClick={() => onAddCopy(book.id, numberOfCopies)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
              >
                <FiPlus size={20} />
                Add New Copies
              </button>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/3 shrink-0">
              <img src={book.coverImage} alt={book.title} className="w-1/2 h-auto object-cover mb-4" />
              <p><strong>Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year Published:</strong> {book.yearPublished || 'N/A'}</p>
              <p><strong>Publisher:</strong> {book.publisher || 'N/A'}</p>
              <p><strong>Description:</strong> {book.description || 'N/A'}</p>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Barcode</th>
                    <th className="border border-gray-300 p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCopies.map(copy => (
                    <tr key={copy.id} className="border border-gray-300">
                      <td className="border border-gray-300 p-2">{copy.barcode}</td>
                      <td className="border border-gray-300 p-2">{copy.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center mt-4 gap-4">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}