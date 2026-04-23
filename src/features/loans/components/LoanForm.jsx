
import { useEffect, useState } from 'react';
import {loanBook, returnBook, loanBook} from '../../../services/loanService';

export default function LoanForm({bookCopy, setCopy}){
   
  const [newLoan , setNewLloan] = useState({barcode:"", nationalNumber:"", dueDate:null, fees:0});
  
  
    const handleLoanBook = async () => {
      
       try{
         const result = await loanBook(newLoan);

         if(result.success){
            
            console.log("go to new loan : ", result?.location || "no location");
         }
         alert(result?.errorMessage);
       }catch(error){
         console.log("Network error: ", error);
       }
       
    }
  
   

    return (
        <div action="submit" className="flex justify-center items-center top-0 left-0 w-full h-full">
          <form
           className="flex flex-col h-fit rounded-md p-10 gap-5 bg-white shadow-md shadow-gray-500">
           
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
                onChange={(e) => setNewLloan({barcode:e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="member">Member :</label>
              <input
              id="member"
              required
               type="text" 
               placeholder="enter national number"
                className="border-gray-400 w-full border rounded-md h-15 p-2" 
                onChange={(e) => setNewLloan({nationalNumber:e.target.value})}/>
            </div>

            <div>
              <label htmlFor="fees">Fees :</label>
              <input
              required
              id="fees" 
              type="number" 
              placeholder="enter national number" 
              className="border-gray-400 w-full border rounded-md h-15 p-2" />
              onChange={(e) => setNewLloan({fees:e.target.value})}
            </div>

            <div>
              <label htmlFor="end-date">End Date :</label>
              <input 
              id="end-date"
              required
              min={new Date().toISOString().split('T')[0]}
              type="date" 
              className="border-gray-400 w-full border rounded-md h-15 p-2"
              onChange={(e) => setNewLloan({dueDate:e.target.value})} />
            </div>
            
            <div className="flex justify-between w-full h-12 gap-2 mt-4">
              
              <button 
              type="button" 
              onClick={setCopy} className="bg-gray-400 w-[30%] text-white rounded">
                Cancel
              </button>
              <button 
              onClick={setCopy}
              type="submit" className="bg-[#10b981] w-[60%] text-white rounded">
                Confirm
              </button>
            </div>
          </form>
        </div>
    );
}