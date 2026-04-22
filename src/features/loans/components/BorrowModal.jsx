import { useState } from "react";
import {FaLevelDownAlt} from 'react-icons/fa';
import LoanForm from './LoanForm';
import { API_URL } from '../../../services/config';

export default function BorrowModal() {
  const [bookCopyData, setBookCopyData] = useState([]);
  
  const [copy, setCopy] = useState(null);
  const [inputValue, setInputValue] = useState("");
      
  const checkBookCopy = async (barcode) => {
    try{
         const res = await fetch (`${API_URL}/bookCopy/${inputValue}/GetBookCopyByBarcode`);
         if(res.ok){
          const copyData = await res.json();
          setBookCopyData(copyData);
           console.log("book found");
         }else{
           console.log("book not found");
         }
    }catch(error){
       console.log(error);
    }
  }

  return (
    <div className="relative flex justify-center items-center h-full w-full ">
      <div hidden={copy!==null} className="flex justify-center items-center h-20 w-full overflow-hidden">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          autoFocus={true}
          className="h-20 w-[60%] border-gray-400 border bg-white py-2 px-4 font-bold text-lg"
          placeholder="Enter barcode here"
        />

        
        <button 
          onClick={() => {checkBookCopy(inputValue)}} 
          className="flex justify-center items-center ml-2 p-2 bg-green-500 text-white rounded h-full"
        > 
          <FaLevelDownAlt className="rotate-85 h-[50%] w-[50%]" />
 
        </button>
      </div>

    
      {copy && (
        <LoanForm barcode={copy.barcode} setCopy={() => setCopy(null)} />
      )}
    </div>
  );
}