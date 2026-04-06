import { useState, useEffect, useRef } from 'react';
import { FiPlus, FiEdit, FiTrash, FiBook } from 'react-icons/fi';
import {FaEllipsisV} from 'react-icons/fa';
import { FaBarcode, FaCalendarCheck, FaArrowsRotate } from "react-icons/fa6";


 function BookDetailsModal({ isOpen, onClose, book, copies, onAddCopy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCopies, setNumberOfCopies] = useState(1);
  const [actionRow, setActionRow] = useState(null);
  const actionRef = useRef(null);
  const itemsPerPage = 5;
   
  
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

  const filteredCopies = copies.filter(copy =>
    copy.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredCopies.length / itemsPerPage));
  const paginatedCopies = filteredCopies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  

  const handleEdit = (copy) => {
    console.log('edit copy', copy);
    setActionRow(null);
  };

  const handleDelete = (copy) => {
    console.log('delete copy', copy);
    
    setActionRow(null);
  };

  const handleBorrow = (copy) => {
    console.log('borrow copy', copy);
    setActionRow(null);
  };

  const primaryActions = {borrowed:'Return', available:'Loan'};

  return (
     
   <div className="fixed flex-col inset-0 flex items-center justify-center bg-black opacity-100 z-50">
    
     <div className="bg-white p-6 rounded-lg w-full max-w-7xl max-h-[80vh] overflow-y-auto border-green-400 border-2">
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
                    <th className="border border-gray-300 p-2">condition</th>
                    <th className="border border-gray-300 p-2">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCopies.map(copy => (
                   
                    <tr key={copy.id} className="border border-gray-300 h-15">
                     
                      <td className="border border-gray-300 p-3">{copy.barcode}</td>
                      <td className="border border-gray-300 p-3 w-40"> <span className={`rounded-md ${copy.status==='available'? 'bg-green-300' : copy.status==='lost'? 'bg-red-600': 'bg-amber-400'}`}>{copy.status}</span></td>
                     <td className="border border-gray-300 p-3">{copy.condition}</td>
                      <td className='relative border border-gray-300 p-3 w-40'> 
                        <button  className={`${copy.status==='borrowed'?'bg-blue-500':copy.status==='available'?'bg-green-500': ''} text-white rounded-md w-[50%] cursor-pointer hover:bg-gray-300 hover:translate-0.5 hover:text-black active:bg-black`}>
                          {primaryActions[copy.status]}
                          </button>
                        <div
                          ref={actionRef}
                          className="relative h-full w-full"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionRow(copy.id === actionRow ? null : copy.id);
                            }}
                            className="absolute right-0 -top-5 text-gray-500"
                            aria-label="Show actions"
                          >
                            <FaEllipsisV />
                           
                          </button>

                          {actionRow === copy.id && (
                            <div className="absolute -right-8 -top-2 mt-2 w-28 bg-white border rounded shadow-lg z-10 flex flex-col">
                             {copy.status === 'available' && (<button
                                onClick={(e) => { e.stopPropagation(); handleEdit(copy); }}
                                className="border-b border-gray-200 p-2 hover:bg-gray-100 flex justify-center gap-2"
                                aria-label="Edit"
                              >
                                <FiEdit className="text-blue-500" />
                                 
                              </button>)}
                              {(copy.status==='available' || copy.status==='lost') && <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(copy); }}
                                className="border-b border-gray-200 p-2 hover:bg-gray-100 flex justify-center"
                                aria-label="Delete"
                              >
                                <FiTrash className="text-red-500" />
                              </button>}

                            {copy.status === 'available' && 
                            <button 
                            className="border-b border-gray-200 p-2 hover:bg-gray-100 flex justify-center">
                               <FaBarcode className="text-gray-600" />
 
                              </button> }
                                      

                               {copy.status === 'borrowed' &&
                                <button
                                 className="border-b border-gray-200 p-2 hover:bg-gray-100 flex justify-center">
                                <FaArrowsRotate className="text-blue-600" />
  
                                </button> }

                                {copy.status === 'borrowed' && 
                                <button
                                 className="border-b border-gray-200 p-2 hover:bg-gray-100 flex justify-center">
                                 <FaCalendarCheck className="text-orange-600" />
 
                                  </button>}
                            </div>
                          )}
                        </div>
                      </td>
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


export default BookDetailsModal;