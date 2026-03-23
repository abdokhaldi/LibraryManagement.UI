
function BookPagination({onNext, onPrev, currentPage ,totalPages}){
 
   return ( <div className="flex justify-center items-center p-4 bg-white gap-4">
        <button 
          onClick={onPrev} 
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={onNext} 
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
   );
}

export default BookPagination;