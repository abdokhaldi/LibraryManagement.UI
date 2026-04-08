
import SearchBar from '../components/SearchBar';
import { useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import NewBookModal from '../components/NewBookModal';
import BookDetailsModal from './BookDetailsModal';
import BookTable from '../components/BookTable';
import BookPagination from '../components/BookPagination';



function BookInventory() {
  

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
 
  const [filters, setFilters] = useState({ category: "All", status: "All" });
  const [categories, setCategories] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading , setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10;

  const actionRef = useRef(null);
  useEffect( ()=> {
   const fetchBooksData = async () =>{
    try{
      let url = `http://localhost:5016/api/Book?PageNumber=${currentPage}&PageSize=${itemsPerPage}&searchTerm=${searchTerm}`;
      
      if(filters.category!=="All"){
        url += `&categoryID=${filters.category}`;
      }

      const res = await fetch(url);
      if(!res.ok){
       console.log('Http request status is ', res.status);
      }
      const paginationHeader = res.headers.get('x-pagination');
      if(paginationHeader){
         const paginationData = JSON.parse(paginationHeader);
        setTotalPages(paginationData.TotalPages);
      }
      const books = await res.json();
      setBooksData(books);
      setLoading(false);
    }catch(error){
     console.log('Failed to fetch users :' , error);
     setLoading(false);
    }
   }

fetchBooksData();
 }, [currentPage,searchTerm,filters.category] );
  
 useEffect(() => {
   const fetchCategories = async () => {
    try{
       const res = await fetch('http://localhost:5016/api/category');
    if(!res.ok){
      console.log(res.status);
    }
    const categoriesData = await res.json();
    setCategories(categoriesData);
    
    }catch(error){
       console.log('Failed to fetch categories: ', error);
    }
  }
   fetchCategories();
 }, []);
  
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
    
      const formData = new FormData();
      formData.append("title",newBook.title || "");
      formData.append("isbn", newBook.isbn || "");
      formData.append("author", newBook.author || "");
      formData.append("publisher", newBook.publisher || "");
      formData.append("yearPublished", newBook.yearPublished || "");
      formData.append("categoryID", newBook.categoryID || "");
      formData.append("description", newBook.description || "");
      if(newBook.image){
      formData.append("image", newBook.image);
      }
    
      try{
      const res = await fetch('http://localhost:5016/api/Book', {
        method: 'POST',
       
        body: formData,
      });

      if (res.status === 201) {
       const savedBook = await res.json();
       
      setBooksData(prev => [...prev, savedBook]);
      setShowModal(false);
      console.log('the book was saved successfuly');
      }else{
        console.log(res.status);
      }

  } catch (error) {
      console.log('Error adding book: ', error);
    }
  };

  const handleUpdateBook = async (bookToUpdate) => {
    const formData = new FormData();
      formData.append("title",bookToUpdate.title || "");
      formData.append("isbn", bookToUpdate.isbn || "");
      formData.append("author", bookToUpdate.author || "");
      formData.append("publisher", bookToUpdate.publisher || "");
      formData.append("yearPublished", bookToUpdate.yearPublished || "");
      formData.append("categoryID", bookToUpdate.categoryID || "");
      formData.append("description", bookToUpdate.description || "");
      if(newBook.image){
      formData.append("image", newBook.image);
      }

      try{
       const res = await fetch(`http://localhost:5016/api/Book/${bookForUpdate?.bookID}` , {
        method:'PUT',
        body:formData,
       });
       if(res.status === 204){
          setShowModal(false);
          console.log('the book was saved successfuly');
       }

      }catch(error){
        console.log(error);
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
      console.log("book id is : ", bookId );
     const res =  await fetch(`http://localhost:5016/api/Book/${bookId}/DeactivateBook`,
       {
        method: 'PATCH',
        headers:{
          "Content-Type": "application/json"
        }
       }
     );
   
     if(res.status === 204){
       console.log("The book was deleted successfuly", );
       setBooksData(prevBooks => prevBooks.filter(book => book.bookID !== bookId));
       setActionRow(null);
       return;
     }

     
     console.log("Delete book was failed in status: " , res.status);
    }
    catch(error){
      console.log("an error occured :", error);
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
   
    <div className="p-4 bg-gray-100 min-h-screen">
      <NewBookModal
      key={bookToUpdate?.bookID || "new"}
        bookForUpdate={bookToUpdate}
        categories={categories}
        isOpen={showModal}
        onClose={() => {setShowModal(false); setBookToUpdate(null)}}
        onAdd={handleAddBook}
        onEdit={()=>{}}
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
            className="px-4 py-3 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-bold text-xm  gap-2"
          >
            <FiPlus size={20} />
            Add New Book
          </button>
        </div>
        
       
        {showFilters &&  (
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
      <div className="bg-white shadow-md overflow-hidden">
      
     
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
      <BookPagination
        onNext={()=>setCurrentPage(currentPage + 1)}
        onPrev={(e)=>{ setCurrentPage(currentPage - 1)}}
        currentPage={currentPage}
        totalPages={totalPages}
     />
     
    </div>
    </div>
  );
}

export default BookInventory;