import {FaChevronLeft,FaChevronRight} from 'react-icons/fa';

function BookPagination({onNext, onPrev, currentPage ,totalPages}){
 
   return ( <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing page <span className="text-slate-800">{currentPage}</span> of <span className="text-slate-800">{totalPages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={onPrev}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <FaChevronLeft size={12} /> Previous
                        </button>
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={onNext}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            Next <FaChevronRight size={12} />
                        </button>
                    </div>
                </div> 
   );
}

export default BookPagination;