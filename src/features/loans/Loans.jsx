import {useEffect, useRef, useState } from 'react';
import {FaSearch ,FaFilter, FaEllipsisV, FaExclamationTriangle , FaPlus } from 'react-icons/fa';
import BorrowNew from './components/BorrowModal';

//import ViewFinesModal from './components/ViewFinesModal';


export default function Loans(){

    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showBorrowModal, setShowBorrowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [loansData,setLoansData] = useState([]);
    const pageSize = 2;
   

   

    useEffect(()=> {

        const loadLoans =async () => {

         try{
          
          const res = await fetch(`http://localhost:5016/api/borrowing?SearchTerm=${searchTerm}&pageNumber=${currentPage}&pageSize=${pageSize}`);
           if(res.ok){
             const loadedLoans = await res.json();
             setLoansData(loadedLoans);
             console.log("data loans loaded successfuly");
           }
       
           const paginationHeader = res.headers.get('x-pagination');
          
           if(paginationHeader){
             const PagedHeader = JSON.parse(paginationHeader);
             setTotalPages(PagedHeader.TotalPages || 0);
           }

         }catch(error){
           console.log("can't load data loans:",error);
         }
        }
    loadLoans();
    }, [currentPage, searchTerm]);

  const actionNames = {Borrowed:"Return" , Overdue:"Return" , Returned:"No Action"};
  const [showActions, setShowActions] = useState(null);
  const actionRef = useRef(null);

  useEffect( () => {
    if(!showActions) return;

    const handleOutsideClick= (event) => {
      if(actionRef.current && !actionRef.current.contains(event.target)){
         setShowActions(null);
      }
    }
    document.addEventListener('mousedown' , handleOutsideClick);
   return () =>  document.removeEventListener('mousedown', handleOutsideClick);
  }, [showActions] );


   const handleReturnBook = async (borrowingId) => { 
    try {
        const res = await fetch(`http://localhost:5016/api/Borrowing/${borrowingId}/ReturnBook`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (res.ok) {
            
            console.log("The book is returned successfully"); 
        } else {
            
            console.error("Failed to return the book:",  res.status );
        }

    } catch (error) {
        console.error("An error occurred while returning the book:", error);
       
    }
};


  const actions = {
  Borrowed: (loan) => (
    <div className='flex items-center justify-around relative'>
     
      <button
        onClick={() => handleReturnBook(loan.borrowingID)} 
        className='bg-blue-400 px-6 py-1 text-lg font-bold text-white rounded-md hover:bg-blue-500 transition-colors'
      >
        {actionNames[loan.status]}
      </button>

      
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowActions(showActions === loan.borrowingID ? null : loan.borrowingID);
        }}
        className='bg-gray-200 py-3 px-3 text-lg font-bold rounded-full flex justify-center hover:bg-gray-300'
      >
        <FaEllipsisV className="text-black" />
      </button>

     
      {showActions === loan.borrowingID && (
        <div ref={actionRef}
        className="absolute top-12 right-0 bg-white shadow-xl border rounded-lg w-40 z-50 py-2">
          <button 
            onClick={() => handleExtendLoan(loan)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            🗓️ Extend Date
          </button>
          <button 
            onClick={() => handleMarkAsLost(loan.borrowingID)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
          >
            ⚠️ Mark as Lost
          </button>
        </div>
      )}
    </div>
  ),

  Returned: (loan) => (
    <div className="flex items-center justify-center">
      <button
        disabled={true}
        className='bg-gray-300 px-6 py-1 text-lg font-bold text-gray-500 rounded-md cursor-not-allowed'
      >
        {actionNames[loan.status]}
      </button>
     
    </div>
  ),

  Overdue: (loan) => (
    <div className='flex items-center justify-around relative'>
     
      <button
        onClick={() => handleReturnBook(loan.borrowingID)}
        className='bg-white px-6 py-1 text-lg font-bold text-red-500 rounded-md shadow border-2 border-red-500 hover:bg-red-50 transition-all'
      >
        {actionNames[loan.status]}
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          setShowActions(showActions === loan.borrowingID ? null : loan.borrowingID);
        }}
        className='bg-red-100 py-3 px-3 text-lg font-bold rounded-full flex justify-center'
      >
        <FaEllipsisV className="text-red-600" />
      </button>

      
      {showActions === loan.borrowingID && (
        <div ref={actionRef}
         className="absolute top-12 right-0 bg-white shadow-xl border rounded-lg w-48 z-50 py-2">
          <button 
            onClick={() => console.log("for warnings")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm font-semibold text-orange-600"
          >
            🔔 Send Warning
          </button>
          <button 
            onClick={() => console.log("this for open fines")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            💰 View Fines
          </button>
        </div>
      )}
    </div>
  ),
};



    return (
        <>
       
       {showBorrowModal  && <BorrowNew onClose={onClose}  />}
       {!showBorrowModal && <div className="h-full w-full flex flex-col gap-3 bg-white rounded-xl py-3">
          <div className='flex justify-between items-center px-3'> 
          <div className="flex items-center w-150 gap-4">
              <div className='relative flex-1'>
               <span className='absolute inset-y-0 left-3 flex items-center text-white'>
                <FaSearch size={18}  />
                 </span>
               <input  type="text"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-400 border-none outline-none text-white placeholder:text-white"
                 placeholder="search by barcode,member,title" 
                 onChange={(e)=> setSearchTerm(e.target.value)}
                 />
               </div>

               <button 
               onClick={() => setShowFilter(!showFilter)}
               className='p-3 rounded-xl bg-gray-400 active:bg-black transition-colors'>
                <FaFilter size={20} color='white'/>
                </button>

                </div> 
                
                <button 
                onClick={() => setShowBorrowModal(true)}
                className='px-4 py-3 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-bold text-xm  gap-2' 
                >
                     <FaPlus size={20} />
                     New Loan
                  </button>
          </div>
      {
        showFilter &&  <div className='h-40 flex items-start gap-5'>
           <h2 className='font-bold'> Status :</h2> 
           <select 
           onChange={(e) => setFilters(e.target.value)}
           className='bg-gray-300 w-50 h-10 rounded-lg'>
            <option value="all"> All Status</option>
            <option value="returned">Returned</option>
            <option value="overdue"> Overdue</option>
            <option value="borrowed">Borrowed</option>
           </select>
           </div>
     }
            
          <table>
           <thead>
            <tr className='bg-gray-200 text-left'>
                <th className='py-4 px-2'>BK</th>
                <th>Title</th>
                <th>Member</th>
                 <th>Start date</th>
                <th>End date</th>
                <th>Returned at</th>
                 <th>Current Fine</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
           </thead>
           <tbody>

            {
               loansData.map((loan) =>{
                
              return <tr key={loan.borrowingID} className='border-b-2'> 
                <td className='py-4 px-2 h-20'>{loan.barcode}</td>
                <td className='py-4 px-2 h-20'>{loan.title}</td>
                <td>{loan.fullName}</td>
                <td>{new Date(loan.borrowingDate).toLocaleDateString()}</td>
                <td>{new Date(loan.dueDate).toLocaleString() }</td>
                <td>{
                 loan.returnDate? new Date(loan.returnDate).toLocaleString()
                 : <span className="text-gray-400 italic font-light">Not Returned Yet</span>}</td>
                 <td>{loan.currentFine}</td>
                <td> <span className={`${loan.status==="Returned"?
                "bg-green-500" : 
                loan.status==="Borrowed"?"bg-blue-700" : 
                loan.status==="Overdue"?"bg-red-600":
                "bg-orange-400" } text-white px-3 rounded-lg`}>
                 {loan.status} </span> </td>

                 <td className='relative'> 
                  {actions[loan.status]?.(loan)}

                </td>
            </tr> 
             }
         )
            }
            
           </tbody>
          </table>
         {
         totalPages>0 && <div className='flex justify-center items-center gap-2'>
            
             
                <button
                 disabled={currentPage===1}
                 onClick={() => setCurrentPage(currentPage -1)}
                 className={`w-30 h-10 rounded-xl ${currentPage>1?'bg-green-500':'bg-gray-400'}`}> previous</button>
                 <p> {`${currentPage} of ${totalPages}`} </p>
                 <button
                 onClick={() => setCurrentPage(currentPage +1)}
                 disabled={currentPage === totalPages}
                  className={` w-30 h-10 rounded-xl ${(currentPage < totalPages)? 'bg-green-500': 'bg-gray-400'}`}> next</button>
          </div>
            }
        </div>
}
        </>
    );
}