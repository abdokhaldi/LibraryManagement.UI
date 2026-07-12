
import { useEffect, useState } from 'react';
import {loanBook} from '../../../../services/loanService';
import {checkPersonExist} from '../../../../services/memberService';

export default function LoanForm({bookCopy, setCopy}){
   
  const [newLoan , setNewLoan] = useState({barcode:bookCopy?.barcode|| "", nationalNumber:"", dueDate:null, initialFees:0});
  
  const [isPersonExisting,setIsPersonExisting] = useState(false);


  const handleLoanBook = async (e) => {
        e.preventDefault();
       try{

        if(!newLoan.barcode) setNewLoan(prev => ({...prev , barcode:bookCopy.barcode}));
        // setTimeout(() => {console.log(newLoan);},2000) ;
         const result = await loanBook(newLoan);
              
         if(result.success){
            
            console.log("go to new loan : ", result?.location || "no location");
            
          }else{
         alert(result?.errorMessage);
          }
       }catch(error){
         console.log("Network error: ", error);
       }
       
    }


  useEffect( () => {
     setIsPersonExisting(false);
     const nationalNumber = newLoan.nationalNumber;
    
     if(!nationalNumber || nationalNumber.length <5 ) return;
     
   const timer = setTimeout(async () => {
    console.log("Checking for person with national number  : ");
    try{
        const result = await checkPersonExist(nationalNumber);
        if(result.success){
          setIsPersonExisting(true);
        }
    }catch(error){
    alert("An unexpected error occurred while checking member existence");
    }
   }, 500);

   return () => clearTimeout();

  }, [newLoan.nationalNumber]);


    return (
        <div  className="flex justify-center items-center top-0 left-0 w-full h-full">
          <form
           onSubmit={handleLoanBook}
           className="flex flex-col h-fit rounded-md p-10 gap-5 bg-white shadow-md shadow-gray-500"
           >
            <div>
              <label htmlFor="book-copy"
              className="font-bold text-lg">Book copy :</label>
              
              <input
                id="book-copy" 
                required
                type="text" 
                value={bookCopy?.barcode} 
                disabled 
                className="w-full border border-gray-400 rounded-md h-15 p-2 bg-gray-100 " 
             />

            </div>
             
            <div>
              <label htmlFor="nationalId">National Number :</label>
              <input
              id="nationalId"
              required
              type="text" 
              disabled={isPersonExisting}
              value={newLoan.nationalNumber}
              placeholder="enter national number"
              className="border-gray-400 disabled:border-green-500 w-full border rounded-md h-15 p-2" 
              onChange={(e) => setNewLoan(prev =>({...prev, nationalNumber:e.target.value}))}/>
            </div>

            <div>
              <label htmlFor="fees">Fees :</label>
              <input
              required
              id="fees" 
              type="number" 
              placeholder="enter fees" 
              className="border-gray-400 w-full border rounded-md h-15 p-2"
              onChange={(e) => setNewLoan(prev =>({...prev, initialFees:e.target.value}))}/>
              
            </div>

            <div>
              <label htmlFor="end-date">End Date :</label>
              <input 
              id="end-date"
              required
              min={new Date().toISOString().split('T')[0]}
              type="date" 
              className="border-gray-400 w-full border rounded-md h-15 p-2"
              onChange={(e) => setNewLoan(prev => ({...prev ,dueDate:e.target.value}))} />
            </div>
            
            <div className="flex justify-between w-full h-12 gap-2 mt-4">
              
              <button 
              type="button" 
               onClick={setCopy} className="bg-gray-400 w-[30%] text-white rounded">
                Cancel
              </button>
              <button 
               type="submit" className="bg-[#10b981] w-[60%] text-white rounded">
                Confirm
              </button>
            </div>
          </form>
        </div>
    );
}