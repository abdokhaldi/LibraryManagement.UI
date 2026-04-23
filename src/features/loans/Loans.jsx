import { useEffect, useRef, useState } from 'react';
import { FaSearch, FaFilter, FaEllipsisV, FaPlus, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaInfoCircle } from 'react-icons/fa';
import ScanModal from './components/ScanModal';
import ViewFinesModal from './FinesHistoryModal';
import {getLoans, returnBook} from '../../services/loanService';

export default function Loans() {
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showBorrowModal, setShowBorrowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loansData, setLoansData] = useState([]);
    const [showActions, setShowActions] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [borrowingId, setBorrowingId] = useState(0);
    const actionRef = useRef(null);
    const pageSize = 8; // 

    // Logic: Loading Data
    useEffect(() => {
        const loadLoansData = async () => {
            try {
               const result = await getLoans({searchTerm,currentPage,pageSize});
               setLoansData(result.data);
               setTotalPages(result.totalPages);
            } catch (error) {
                console.error("Data load failed:", error);
            }
        };
        loadLoansData();
    }, [currentPage, searchTerm]);

    
    useEffect(() => {
        if (!showActions) return;
        const handleOutsideClick = (e) => {
            if (actionRef.current && !actionRef.current.contains(e.target)) setShowActions(null);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [showActions]);

    const handleReturnBook = async (id) => { 
       
        try{
           const result = await returnBook(id);
           if(result.success){
              console.log("the book returned successfully");
           }else {
           alert(result.errorMessage);
           }
        }
     catch(error){
          console.log("Network error: ", error);
          alert("some error occurred in the server")
        }
    };

    const handleCloseFines = () => setIsOpen(false);

   
    const getStatusStyle = (status) => {
        const styles = {
            Returned: "bg-green-100 text-green-700 border-green-200",
            Borrowed: "bg-blue-100 text-blue-700 border-blue-200",
            Overdue: "bg-red-100 text-red-700 border-red-200",
        };
        return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
    };


    return (
        <div className="relative p-6 bg-slate-50 min-h-screen font-sans">
            {
            isOpen && <ViewFinesModal 
            isOpen={isOpen} 
            onClose={handleCloseFines} 
            borrowingId={borrowingId} />
            }
            {showBorrowModal && <ScanModal onClose={setShowBorrowModal} />}

          
          {!showBorrowModal && <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                
                
                <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
                    <div className="flex items-center gap-3 flex-1 min-w-75">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search by barcode, member, or book title..."
                                className="w-full pl-11 pr-4 py-2.5 bg-slate-200 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-700 placeholder:text-slate-400"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilter(!showFilter)}
                            className={`p-2.5 rounded-xl transition-all ${showFilter ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-200'}`}
                        >
                            <FaFilter size={18} />
                        </button>
                    </div>

                    <button 
                        onClick={() => setShowBorrowModal(true)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
                    >
                        <FaPlus /> New Loan
                    </button>
                </div>

                
                {showFilter && (
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4 animate-in slide-in-from-top duration-300">
                        <span className="text-sm font-bold text-slate-600">Filter by Status:</span>
                        <select 
                            onChange={(e) => setFilters(e.target.value)}
                            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 shadow-sm outline-none"
                        >
                            <option value="all">All Records</option>
                            <option value="returned">Returned Only</option>
                            <option value="overdue">Overdue Items</option>
                            <option value="borrowed">Currently Borrowed</option>
                        </select>
                    </div>
                )}

               
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                                <th className="px-6 py-4">Book Info</th>
                                <th className="px-6 py-4">Member</th>
                                <th className="px-6 py-4 text-center">Timeline</th>
                                <th className="px-6 py-4 text-center">Fees & Fines</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loansData.map((loan) => (
                                <tr key={loan.borrowingID} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-800 text-sm">{loan.title}</span>
                                            <span className="text-xs text-slate-400 font-mono mt-1">#{loan.barcode}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600 font-medium">{loan.fullName}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center gap-1 text-[11px] font-semibold">
                                            <span className="text-blue-600 bg-blue-50 px-2 rounded-md">In: {new Date(loan.borrowingDate).toLocaleDateString()}</span>
                                            <span className="text-amber-600 bg-amber-50 px-2 rounded-md">Due: {new Date(loan.dueDate).toLocaleDateString()}</span>
                                            {loan.returnDate && <span className="text-green-600 bg-green-50 px-2 rounded-md">Out: {new Date(loan.returnDate).toLocaleDateString()}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Fees: ${loan.initialFees}</span>
                                            <span className="text-sm font-bold text-red-500">Fine: ${loan.currentFine}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(loan.status)}`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative">
                                        <div className="flex justify-end items-center gap-2">
                                            {loan.status !== "Returned" && (
                                                <button 
                                                    onClick={() => handleReturnBook(loan.borrowingID)}
                                                    className="text-xs bg-slate-800 hover:bg-black text-white px-3 py-1.5 rounded-lg transition-all"
                                                >
                                                    Return
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => setShowActions(showActions === loan.borrowingID ? null : loan.borrowingID)}
                                                className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-all"
                                            >
                                                <FaEllipsisV />
                                            </button>
                                        </div>

                                        {/* Dropdown Menu */}
                                        {showActions === loan.borrowingID && (
                                            <div ref={actionRef} className="absolute right-6 top-12 w-48 bg-white shadow-xl border border-slate-100 rounded-xl z-50 py-2 animate-in zoom-in-95 duration-100">
                                               {loan.status !=="Returned" && <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-600">
                                                    <FaCalendarAlt className="text-blue-500" /> Extend Date
                                                </button>
                                                 }

                                               { loan.status ==="Returned" && <button 
                                                    onClick={() => {setIsOpen(true); setBorrowingId(loan.borrowingID)}}
                                                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-600"
                                                >
                                                    <FaInfoCircle className="text-amber-500" /> View Fines
                                                </button>
}
                                                <div className="h-px bg-slate-100 my-1"></div>
                                               {loan.status ==="Overdue" && <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-500 font-semibold">
                                                    ⚠️ Mark as Lost
                                                </button>}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

               
              { loansData.length != 0 &&  <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <p className="text-sm text-slate-500 font-medium">
                        Showing page <span className="text-slate-800">{currentPage}</span> of <span className="text-slate-800">{totalPages}</span>
                    </p>
                    <div className="flex gap-2">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            <FaChevronLeft size={12} /> Previous
                        </button>
                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                        >
                            Next <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>
                   }
            </div>
            }
        </div>
    );
}