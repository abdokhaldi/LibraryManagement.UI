
import SearchBar from '../components/SearchBar';
import { useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import NewBookModal from '../components/NewBookModal';
import BookDetailsModal from './BookDetailsModal';
import BookTable from '../components/BookTable';
import BookPagination from '../components/BookPagination';

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
  const actionRef = useRef(null);
  const itemsPerPage = 10;
  const covers = [cover1, cover2, cover3, cover4, cover5, cover6];

  // Book list
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
  // copies list
  const [copies, setCopies] = useState([
    // For book 1: 5 copies
    {id: 1, bookId: 1, barcode: 'COPY-1-1', status: 'available', condition:'new'},
    {id: 2, bookId: 1, barcode: 'COPY-1-2', status: 'available', condition:'good'},
    {id: 3, bookId: 1, barcode: 'COPY-1-3', status: 'lost', condition:'old'},
    {id: 4, bookId: 1, barcode: 'COPY-1-4', status: 'available', condition:'old'},
    {id: 5, bookId: 1, barcode: 'COPY-1-5', status: 'borrowed', condition:'new'},
    // For book 2: 3 copies
    {id: 6, bookId: 2, barcode: 'COPY-2-1', status: 'lost', condition:'new'},
    {id: 7, bookId: 2, barcode: 'COPY-2-2', status: 'borrowed', condition:'old'},
    {id: 8, bookId: 2, barcode: 'COPY-2-3', status: 'available', condition:'good'},
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
  const [actionRow, setActionRow] = useState(null); 
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
  const handleDelete = (bookId) => {
    console.log('delete', bookId);
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    setActionRow(null);
  };

 const handleRowClick = (id, index) => {
  setSelectedRowId(id);
  setSelectedIndex(index);
};


const handleKeyDown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    const nextIndex = Math.min(selectedIndex + 1, paginatedBooks.length - 1);
    setSelectedIndex(nextIndex);
    setSelectedRowId(paginatedBooks[nextIndex].id);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    const prevIndex = Math.max(selectedIndex - 1, 0);
    setSelectedIndex(prevIndex);
    setSelectedRowId(paginatedBooks[prevIndex].id);
  }
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
       
       <BookTable 
        books={paginatedBooks}
         selectedRowId={selectedRowId}
          onRowClick={handleRowClick}
          onKeyDown={handleKeyDown} 
          onOpenDetails={openDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          actionRow={actionRow} 
          setActionRow={setActionRow}
          actionRef={actionRef}
       />
      </div>
      <BookPagination
        onNext={()=>setCurrentPage(Math.min(totalPages, currentPage + 1))}
        onPrev={()=>setCurrentPage(Math.max(1, currentPage - 1))}
        currentPage={currentPage}
        totalPages={totalPages}
     />
     
    </div>
    </div>
  );
}

export default BookInventory;