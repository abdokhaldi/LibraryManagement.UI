
import SearchBar from '../../commonCards/SearchBar';
import StatCard from '../../commonCards/StatCard';
import { useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaBook, FaCopy, FaCheckCircle } from 'react-icons/fa';
import BookForm from '../components/BookForm';
import BookDetailsModal from './BookDetailsModal';
import BookTable from '../components/BookTable';
import BookPagination from '../../Pagination/Pagination';
import {getCategoriesList,getBooksList,addBook,updateBook, deleteBook} from '../../../services/bookService';

function BookInventory() {
  

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
 
  const [filters, setFilters] = useState({ category: "All", status: "All" });
  const [categories, setCategories] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage =10;

  const actionRef = useRef(null);

  useEffect( ()=> {
   const fetchBooksData = async () => {

    try{
      
      const result = await getBooksList({pageNumber:currentPage,pageSize: itemsPerPage ,searchTerm:searchTerm, category: filters.category!=="All" ? filters.category : undefined});
        
        setBooksData(result.data);
        setTotalPages(result.totalPages);
        setLoading(false);
    }catch(error){
     console.log('Failed to fetch users :' , error);
     setLoading(false);
    }
   }
fetchBooksData();
 }, [currentPage,searchTerm,filters.category] );

  
 useEffect(() => {
   const getCategories = async () => {
    try{
       const result = await getCategoriesList();
    
      setCategories(result.data);
    
    }catch(error){
       alert('Failed to fetch categories: ', error);
    }
  }
   getCategories();
 }, []);
  
  
  //const [copies, setCopies] = useState([]);
  
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
  
  const handleAddBook = async (newBook) => {
     
    try{
      const result = await addBook(newBook);

      if (result.success) {
      console.log('the book was saved successfuly');
      setBooksData(prev => [...prev, result.newBook]);
      setShowModal(false);
      return;
    }

         alert(result.errorMessage);

   } catch (error) {
       console.error(error);
      alert('Error adding book: ', error);
    }
  };



  const handleUpdateBook = async (bookToUpdate) => {
    
   try{

         const result = await updateBook(bookToUpdate);

          if(result.success){
            console.log("the book was updated successfuly");
            setBooksData(prev => prev.map(b => b.bookID === bookToUpdate.bookID ? {...b, ...result.updatedBook} : b));
          setShowModal(false);
          return;
          }

            alert(result.errorMessage);
         
      }catch(error){
        alert(error);
      }
  }
  
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

const [bookToUpdate, setBookToUpdate] = useState(null);

  const handleOpenEditModal = (book) => {
    
    if(book){
      setBookToUpdate(book);
      setShowModal(true);
      
      setActionRow(null); 
     
    }
   };

  const handleDelete = async (bookId) => {
    try{
   
      const result = await deleteBook(bookId);
   
     if(result.success){
       
       setBooksData(prevBooks => prevBooks.filter(book => book.bookID !== bookId));
       setActionRow(null);
       return;
     }

     alert("Delete book was failed");
    }
    catch(error){
      alert("an error occured :", error);
    }
    
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



if (loading) {
  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold text-gray-600">
        Loading books from server...
      </div>
    </div>
  );
}
  return (
   
    <div className="bg-gray-100 min-h-screen ">
      <BookForm
        key={bookToUpdate?.bookID || "new"}
        bookForUpdate={bookToUpdate}
        categories={categories}
        isOpen={showModal}
        onClose={() => {setShowModal(false); setBookToUpdate(null)}}
        onAdd={handleAddBook}
        onEdit={handleUpdateBook}
      />
      <BookDetailsModal
        isOpen={showDetails}
        onClose={closeDetails}
        book={selectedBook}
        onAddCopy={handleAddCopy}
      />
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
            label="Total Books"
            value={booksData.length}
            icon={<FaBook size={18} />}
            color="green"
        />
        <StatCard
            label="Total Copies"
            value={booksData.reduce((sum, b) => sum + (b.totalCopies || 0), 0)}
            icon={<FaCopy size={18} />}
            color="teal"
        />
        <StatCard
            label="Available Books"
            value={booksData.reduce((sum, b) => sum + (b.availableCopies || 0), 0)}
            icon={<FaCheckCircle size={18} />}
            color="emerald"
        />
      </div>
      <div className={`${(showModal||showDetails) ? 'filter blur-sm' : ''} `}>        
        <div className="bg-white p-4 rounded-t-lg shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
          <SearchBar 
            placeholder="Search by title, isbn, author..."
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            onFilterClick={() => setShowFilter(!showFilter)} 
            isFilterActive={showFilter}
          />
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-2.5 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-bold text-xm  gap-2"
          >
            <FiPlus size={20} />
            Add New Book
          </button>
        </div>
        
       
        {showFilter &&  (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg flex gap-4 animate-in fade-in">
            <select className="p-2 border rounded" onChange={(e) => setFilters({...filters, category: e.target.value})}>
             <option value="All"> all </option>
              { categories.map((category) => (
                   <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
               ) )
            }
            </select>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md overflow-visible">
      
     
       <BookTable 
         
         books={booksData}
         selectedRowId={selectedRowId}
          onRowClick={handleRowClick}
          onKeyDown={handleKeyDown} 
          onOpenDetails={openDetails}
          onEdit={handleOpenEditModal}
          onDelete={handleDelete}
          actionRow={actionRow} 
          setActionRow={setActionRow}
          actionRef={actionRef}
         />
         
      </div>
      
    { <BookPagination
    onNext={() => setCurrentPage(prev => prev +1)}
    onPrev={() => setCurrentPage(prev => prev -1)}
    currentPage={currentPage}
    totalPages={totalPages}
    />}  
     
    </div>

    </div>
  );
}

export default BookInventory;