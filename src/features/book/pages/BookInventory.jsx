
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import NewBookModal from '../components/NewBookModal';
import BookDetailsModal from '../components/BookDetailsModal';

import cover1 from '../assets/OIP.jpg';
import cover2 from '../assets/OIP (1).jpg';
import cover3 from '../assets/OIP (2).jpg';
import cover4 from '../assets/OIP (3).jpg';
import cover5 from '../assets/OIP (4).jpg';
import cover6 from '../assets/OIP (6).jpg';


function BookInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
 
  const [filters, setFilters] = useState({ category: "All", status: "All" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const covers = [cover1, cover2, cover3, cover4, cover5, cover6];

  const [books, setBooks] = useState([
    {id: 1, title: "Design Patterns", author: "Gang of Four", isbn: "978-0201633610", availableCopies: 5, category: "Tech", coverImage: covers[0 % covers.length]},
    {id: 2, title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", availableCopies: 3, category: "Tech", coverImage: covers[1 % covers.length]},
    {id: 3, title: "Art of War", author: "Sun Tzu", isbn: "978-0140192667", availableCopies: 7, category: "History", coverImage: covers[2 % covers.length]},
    {id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", isbn: "978-0201616224", availableCopies: 2, category: "Tech", coverImage: covers[3 % covers.length]},
    {id: 5, title: "A Brief History of Time", author: "Stephen Hawking", isbn: "978-0553380163", availableCopies: 4, category: "Science", coverImage: covers[4 % covers.length]},
    {id: 6, title: "The Art of Computer Programming", author: "Donald Knuth", isbn: "978-0201896831", availableCopies: 1, category: "Tech", coverImage: covers[5 % covers.length]},
    {id: 7, title: "Structure and Interpretation of Computer Programs", author: "Abelson & Sussman", isbn: "978-0262510875", availableCopies: 6, category: "Tech", coverImage: covers[6 % covers.length]},
    {id: 8, title: "Introduction to Algorithms", author: "Cormen, Leiserson", isbn: "978-0262033848", availableCopies: 4, category: "Tech", coverImage: covers[7 % covers.length]},
    {id: 9, title: "The C Programming Language", author: "Kernighan & Ritchie", isbn: "978-0131101630", availableCopies: 2, category: "Tech", coverImage: covers[8 % covers.length]},
    {id: 10, title: "Database System Concepts", author: "Silberschatz", isbn: "978-0078022159", availableCopies: 3, category: "Tech", coverImage: covers[9 % covers.length]},
    {id: 11, title: "Operating System Concepts", author: "Silberschatz", isbn: "978-1118064672", availableCopies: 5, category: "Tech", coverImage: covers[10 % covers.length]},
    {id: 12, title: "Computer Architecture", author: "Hennessy & Patterson", isbn: "978-0128119051", availableCopies: 4, category: "Tech", coverImage: covers[11 % covers.length]},
  ]);
  const [copies, setCopies] = useState([
    // For book 1: 5 copies
    {id: 1, bookId: 1, barcode: 'COPY-1-1', status: 'available'},
    {id: 2, bookId: 1, barcode: 'COPY-1-2', status: 'available'},
    {id: 3, bookId: 1, barcode: 'COPY-1-3', status: 'available'},
    {id: 4, bookId: 1, barcode: 'COPY-1-4', status: 'available'},
    {id: 5, bookId: 1, barcode: 'COPY-1-5', status: 'available'},
    // For book 2: 3 copies
    {id: 6, bookId: 2, barcode: 'COPY-2-1', status: 'available'},
    {id: 7, bookId: 2, barcode: 'COPY-2-2', status: 'available'},
    {id: 8, bookId: 2, barcode: 'COPY-2-3', status: 'available'},
    // And so on for others, but for brevity, I'll add a few
  ]);

const filteredBooks = books.filter(item => {
    const lower = searchTerm.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(lower) ||
      item.author.toLowerCase().includes(lower) ||
      item.isbn.toLowerCase().includes(lower);
    const matchesCategory = filters.category === "All" || item.category === filters.category;
    return matchesSearch && matchesCategory;
});

const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
const paginatedBooks = filteredBooks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [actionRow, setActionRow] = useState(null); // id of row with actions open

  const handleAddBook = (newBook) => {
    const newBookId = books.length + 1;
    const newCopies = [];
    for (let i = 1; i <= newBook.copies; i++) {
      newCopies.push({
        id: copies.length + i,
        bookId: newBookId,
        barcode: `COPY-${newBookId}-${i}`,
        status: 'available',
      });
    }
    setCopies(prev => [...prev, ...newCopies]);
    setBooks(prev => [
      ...prev,
      {
        id: newBookId,
        title: newBook.title,
        author: 'Unknown',
        isbn: newBook.isbn,
        availableCopies: newBook.copies || 1,
        category: newBook.category,
        coverImage: "https://via.placeholder.com/100x150?text=" + encodeURIComponent(newBook.title),
        description: newBook.description,
      },
    ]);
  };

  const openDetails = (book) => {
    setSelectedBook(book);
    setShowDetails(true);
  };
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedBook(null);
  };

  const handleAddCopy = (bookId, numCopies = 1) => {
    const existingCopies = copies.filter(c => c.bookId === bookId);
    const newCopies = [];
    for (let i = 1; i <= numCopies; i++) {
      newCopies.push({
        id: copies.length + i,
        bookId: bookId,
        barcode: `COPY-${bookId}-${existingCopies.length + i}`,
        status: 'available',
      });
    }
    setCopies(prev => [...prev, ...newCopies]);
  };

  const handleEdit = (book) => {
    console.log('edit', book);
    setActionRow(null);
  };
  const handleDelete = (book) => {
    console.log('delete', book);
    setActionRow(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <NewBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddBook}
      />
      <BookDetailsModal
        isOpen={showDetails}
        onClose={closeDetails}
        book={selectedBook}
        copies={copies.filter(c => c.bookId === selectedBook?.id)}
        onAddCopy={handleAddCopy}
      />
      <div className={`${(showModal||showDetails) ? 'filter blur-sm' : ''}`}>        
        <div className="bg-white p-4 rounded-t-lg shadow-sm">
        <div className="flex justify-between items-center gap-4 mb-4">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onFilterClick={() => setShowFilters(!showFilters)} 
          />
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
          >
            <FiPlus size={20} />
            Add New Book
          </button>
        </div>
        
       
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg flex gap-4 animate-in fade-in">
            <select className="p-2 border rounded" onChange={(e) => setFilters({...filters, category: e.target.value})}>
              <option value="All">All Categories</option>
              <option value="Tech">Tech</option>
              <option value="History">History</option>
              <option value="Science">Science</option>
            </select>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md overflow-hidden">
       
        <table className="w-full">
            <thead>
                <tr className="h-12 bg-gray-200 text-left">
                    <th className="p-4">Cover</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">ISBN</th>
                    <th className="p-4">Available Copies</th>
                </tr>
            </thead>
            <tbody>
                {paginatedBooks.map(book => (
                    <tr
                      key={book.id}
                      className="border-b hover:bg-gray-50 cursor-pointer group relative"
                      onClick={() => openDetails(book)}
                    >
                        <td className="p-4 flex items-center">
                          <span className="mr-2 opacity-0 group-hover:opacity-100">
                            <button
                              onClick={(e) => { e.stopPropagation(); openDetails(book); }}
                              className="text-blue-500 underline text-sm"
                            >
                              Details
                            </button>
                          </span>
                          <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover" />
                        </td>
                        <td className="p-4">{book.title}</td>
                        <td className="p-4">{book.author}</td>
                        <td className="p-4">{book.isbn}</td>
                        <td className="p-4">{book.availableCopies}
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100">
                            <button
                              onClick={(e) => { e.stopPropagation(); setActionRow(book.id === actionRow ? null : book.id); }}
                              className="text-gray-500"
                            >
                              ⋮
                            </button>
                            {actionRow === book.id && (
                              <div className="absolute right-0 mt-2 w-20 bg-white border rounded shadow-lg z-10 flex flex-col">
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleEdit(book); }}
                                  className="p-2 hover:bg-gray-100 flex justify-center"
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleDelete(book); }}
                                  className="p-2 hover:bg-gray-100 flex justify-center"
                                >
                                  <FiTrash />
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center p-4 bg-white gap-4">
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
  );
}

export default BookInventory;