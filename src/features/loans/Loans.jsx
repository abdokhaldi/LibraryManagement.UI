import { useState } from 'react';
import {FaSearch ,FaFilter , FaPlus } from 'react-icons/fa';
import BorrowNew from './components/BorrowModal';

export default function Loans(){

    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({status:"all"});
    const [searchTerm, setSearchTerm] = useState("");
    const [showBorrowModal, setShowBorrowModal] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 2;

 const loans = [
    {id:1,barcode:"bk-1-1",title:"Clean code",member:"abdenabi khaldi", borrowingDate:"08/04-2026",dueDate:"08/04-2026",returnDate:"09/04-2026",status:"returned"},
    {id:2,barcode:"bk-1-1",title:"The art of computer programming",member:"abdenabi khaldi", borrowingDate:"08/04-2026",dueDate:"08/04-2026",returnDate:"09/04-2026",status:"borrowed"},
    {id:3,barcode:"bk-1-1",title:"The art of war",member:"abdenabi khaldi", borrowingDate:"08/04-2026",dueDate:"08/04-2026",returnDate:"09/04-2026",status:"completed"},
    {id:4,barcode:"bk-1-1",title:"48 Laws of power",member:"abdenabi khaldi", borrowingDate:"08/04-2026",dueDate:"08/04-2026",returnDate:"09/04-2026",status:"returned"},
];

const filteredLoans = loans.filter(loan => 
{
  const termToLower = searchTerm.toLowerCase();
  const searchTermMaches = loan.title.toLowerCase().includes(termToLower) 
  || loan.barcode.toLowerCase().includes(termToLower) 
  || loan.member.toLowerCase().includes(termToLower);
  const filterMaches = filters.status === "all" || loan.status === filters.status ;

  return searchTermMaches && filterMaches;
});

const totalNumber = filteredLoans.length;

const totalPages = Math.ceil(totalNumber / pageSize); 

const pagedLoans = filteredLoans.slice((pageNumber -1) * pageSize , pageNumber * pageSize);

const handleNext = () => {
     
    setPageNumber(prev => prev+1);
}
const handlePrevious = () => {
    
    setPageNumber(prev => prev-1);
}

const onClose = ()=>{
   setShowBorrowModal(false);
}

const hasNext = pageNumber < totalPages;
const hasPrevious = pageNumber > 1;


    return (
        <>
       {showBorrowModal && <BorrowNew onClose={onClose}  />}
       {!showBorrowModal && <div className="h-full w-full flex flex-col gap-3 bg-white rounded-xl py-3">
          <div className='flex justify-between items-center px-3'> 
          <div className=" w-full flex items-center gap-4">
              <div className='flex items-center gap-2 px-2 bg-gray-200 rounded-xl w-[50%]'>
               <span  >
                <FaSearch size={18} />
                 </span>
               <input  type="text"
                className="h-12 w-full outline-0 border-none"
                 placeholder="search by barcode,member,title" 
                 onChange={(e)=> setSearchTerm(e.target.value)}
                 />
               </div>

               <button 
               onClick={() => setShowFilter(!showFilter)}
               className='bg-gray-300 text-black h-full p-3 rounded-xl hover:bg-gray-400 transition-colors'>
                <FaFilter size={20}/>
                </button>

                </div> 
                
                <button 
                onClick={() => setShowBorrowModal(true)}
                className='flex items-center justify-start p-3 bg-green-500 text-white w-1/5 gap-2 rounded-xl' 
                >
                     <FaPlus size={20} />
                     borrow new 
                  </button>
          </div>
      {
        showFilter &&  <div className='h-40 flex items-start gap-5'>
           <h2 className='font-bold'>Category :</h2> 
           <select 
           onChange={(e) => setFilters({status:e.target.value})}
           className='bg-gray-300 w-50 h-10 rounded-lg'>
            <option value="all"> all</option>
            <option value="completed">completed</option>
            <option value="late"> late</option>
            <option value="borrowed">borrowed</option>
           </select>
           </div>
     }
           
          <table>
           <thead>
            <tr className='bg-gray-200 text-left'>
                <th className='py-4 px-2'>BK</th>
                <th>Title</th>
                <th>Member</th>
                 <th>Borrowed at</th>
                <th>Due date</th>
                <th>Returned at</th>
                <th>Status</th>
            </tr>
           </thead>
           <tbody>

            {
               pagedLoans.map((loan) =>{
                
              return <tr key={loan.id} className='border-b-2'> 
                <td className='py-4 px-2 h-20'>{loan.barcode}</td>
                <td className='py-4 px-2 h-20'>{loan.title}</td>
                <td>{loan.member}</td>
                <td>{loan.borrowingDate}</td>
                <td>{loan.dueDate}</td>
                <td>{loan.returnDate}</td>
                <td>{loan.status}</td>
            </tr> 
             }
         )
            }
            
           </tbody>
          </table>
         {
         totalPages && <div className='flex justify-center items-center gap-2'>
            
             
                <button
                 disabled={!hasPrevious}
                 onClick={handlePrevious}
                 className={`w-30 h-10 rounded-xl ${hasPrevious?'bg-green-500':'bg-gray-400'}`}> previous</button>
                 <p> {`${pageNumber} of ${totalPages}`} </p>
                 <button
                 onClick={handleNext}
                 disabled={!hasNext}
                  className={` w-30 h-10 rounded-xl ${(hasNext)? 'bg-green-500': 'bg-gray-400'}`}> next</button>
          </div>
            }
        </div>
}
        </>
    );
}