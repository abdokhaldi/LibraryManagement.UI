import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit, FiTrash, FiTool, FiBook } from 'react-icons/fi'; // FiTool للصيانة
import { FaEllipsisV, FaExclamationTriangle } from 'react-icons/fa';
import { FaBarcode, FaCalendarCheck, FaArrowsRotate } from "react-icons/fa6";

function BookDetailsModal({ isOpen, onClose, book, onAddCopy }) {
  const bookCover = "http://localhost:5016/images/covers/";
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [actionRow, setActionRow] = useState(null);
  const actionRef = useRef(null);
  const itemsPerPage = 3;

  const [loadedCopies, setLoadedCopies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

 
  const statusConfig = {
    available: { label: 'Loan', color: 'bg-green-500', text: 'Available' },
    borrowed: { label: 'Return', color: 'bg-blue-500', text: 'Borrowed' },
    damaged: { label: 'Repair', color: 'bg-orange-500', text: 'Damaged' },
    lost: { label: '---', color: 'bg-red-600', text: 'Lost' }
  };

  useEffect(() => {
    if (!isOpen || !book.bookID) return;
    const loadBookCopies = async () => {
      try {
        const res = await fetch(`http://localhost:5016/api/bookCopy?bookID=${book.bookID}&searchTerm=${searchTerm}&pageSize=${itemsPerPage}&pageNumber=${currentPage}`);
        if (res.ok) {
          const copies = await res.json();
          setLoadedCopies(copies);
        }
        const paginationHeader = res.headers.get('x-pagination');
        if (paginationHeader) {
          const paginationData = JSON.parse(paginationHeader);
          setTotalPages(paginationData.TotalPages || 0);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadBookCopies();
  }, [book, currentPage, searchTerm, isOpen]);

  useEffect(() => {
    if (!actionRow) return;
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setActionRow(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [actionRow]);

  if (!isOpen || !book) return null;

  const handleAction = (type, copy) => {
    console.log(`${type} copy:`, copy);
    setActionRow(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col border-green-400 border-2">
        
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold italic">"{book.title}" Details</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="1"
              value={numberOfCopies}
              onChange={(e) => setNumberOfCopies(parseInt(e.target.value, 10) || 1)}
              className="w-20 p-2 border rounded shadow-sm"
            />
            <button
              onClick={() => onAddCopy(book.id, numberOfCopies)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 transition-colors"
            >
              <FiPlus size={20} /> Add New Copies
            </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-y-auto">
          
          <div className="w-1/4 sticky top-0">
            <img 
              src={`${bookCover}${book.imagePath}`} 
              alt={book.title} 
              className="w-full h-auto rounded shadow-md mb-4 object-cover"
              onError={(e) => { e.target.src = "/placeholder-cover.jpg"; }}
            />
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Year:</strong> {book.yearPublished || 'N/A'}</p>
              <p className="line-clamp-4"><strong>Desc:</strong> {book.description || 'No description'}</p>
            </div>
          </div>

         
          <div className="flex-1">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300 text-left">
                  <th className="p-3">Barcode</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadedCopies.map(copy => (
                  <tr key={copy.bookCopyID} className="border-b hover:bg-gray-50 transition-colors h-16">
                    <td className="p-3 font-mono">{copy.barcode}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs text-white font-bold uppercase ${statusConfig[copy.status.toLowerCase()]?.color || 'bg-gray-400'}`}>
                        {copy.status}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{copy.condition}</td>
                    <td className="p-3 relative">
                      <div className="flex items-center justify-center gap-2">
                        
                        <button 
                          disabled={copy.status.toLowerCase() === 'lost'}
                          className={`px-4 py-1 text-white rounded shadow-sm text-sm w-24 transition-transform active:scale-95 ${statusConfig[copy.status.toLowerCase()]?.color} disabled:bg-gray-300`}
                        >
                          {statusConfig[copy.status.toLowerCase()]?.label}
                        </button>

                       
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionRow(copy.bookCopyID === actionRow ? null : copy.bookCopyID);
                            }}
                            className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-200"
                          >
                            <FaEllipsisV />
                          </button>

                          {actionRow === copy.bookCopyID && (
                            <div 
                              ref={actionRef}
                              className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-xl z-60 flex flex-col py-1 animate-in fade-in zoom-in duration-100"
                            >
                              
                              {copy.status.toLowerCase() === 'available' && (
                                <>
                                  <button onClick={() => handleAction('edit', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm"><FiEdit className="text-blue-500" /> Edit Copy</button>
                                  <button onClick={() => handleAction('barcode', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm"><FaBarcode /> Print Label</button>
                                  <button onClick={() => handleAction('damage', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm text-orange-600"><FaExclamationTriangle /> Mark Damaged</button>
                                </>
                              )}

                              
                              {copy.status.toLowerCase() === 'borrowed' && (
                                <>
                                  <button onClick={() => handleAction('extend', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm"><FaArrowsRotate className="text-blue-600" /> Extend Date</button>
                                  <button onClick={() => handleAction('history', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm"><FaCalendarCheck className="text-orange-600" /> History</button>
                                  <button onClick={() => handleAction('lost', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm text-red-600"><FiTrash /> Mark Lost</button>
                                </>
                              )}

                             
                              {copy.status.toLowerCase() === 'damaged' && (
                                <button onClick={() => handleAction('repair', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm"><FiTool className="text-orange-500" /> Fixed / Ready</button>
                              )}

                              
                              {(['available', 'lost', 'damaged'].includes(copy.status.toLowerCase())) && (
                                <button onClick={() => handleAction('delete', copy)} className="flex items-center gap-3 p-2 hover:bg-gray-100 text-sm text-red-700 border-t"><FiTrash /> Delete</button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

           
            {totalPages === 0 && (
              <div className='flex flex-col justify-center items-center py-10 opacity-40'>
                <FiBook size={50} />
                <p className='text-lg font-medium'>No copies found</p>
              </div>
            )}

           
            {totalPages > 0 && (
              <div className="flex justify-center items-center mt-6 gap-6">
                <button
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage <= 1}
                  className="px-5 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                <span className="font-semibold text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-5 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-4 border-t">
          <button
            onClick={() => { setCurrentPage(1); onClose(); }}
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetailsModal;