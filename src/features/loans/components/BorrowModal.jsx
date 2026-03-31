import { useState } from "react";
import {FaLevelDownAlt} from 'react-icons/fa';
import LoanForm from './LoanForm';
export default function BorrowModal() {
  const [copies, setCopies] = useState([
    { id: 1, barcode: "000001", status: "available" },
    { id: 2, barcode: "000002", status: "available" },
    { id: 3, barcode: "000003", status: "available" }
  ]);
  
  const [copy, setCopy] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const checkBook = (barcode) => {
    if (barcode) {
      
      const bookCopy = copies.find((c) => c.barcode === barcode);
      
      if (bookCopy) {
        setCopy(bookCopy);
      } else {
        alert("This barcode does not exist!");
        setCopy(null);
      }
    }
  };

  return (
    <div className="relative flex justify-center items-center h-full w-full z-9999 ">
      <div hidden={copy!==null} className="flex justify-center items-center h-20 w-full overflow-hidden">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"

          className="h-20 w-[60%] border-gray-400 border bg-white py-2 px-4 font-bold text-lg"
          placeholder="Enter barcode here"
        />

        
        <button 
          onClick={() => checkBook(inputValue)} 
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