import { useState } from "react";
// 1. إضافة الأيقونات المفقودة
import { FaLevelDownAlt, FaBarcode, FaArrowRight } from 'react-icons/fa';
import LoanForm from './LoanForm';
import { API_URL } from '../../../services/config';

export default function ScanModal({onClose}) {
  // اجعل الحالة الافتراضية null لتجنب مشاكل المصفوفات الفارغة
  const [copy, setCopy] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const checkBookCopy = async (barcode) => {
    if (!barcode) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/bookCopy/${barcode}/GetBookCopyByBarcode`);
      if (res.ok) {
        const copyData = await res.json();
        // 2. تحديث الـ copy مباشرة هنا بالبيانات القادمة فوراً
        setCopy(copyData);
        console.log("book found");
      } else {
        alert("Book copy not found!");
        setCopy(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bg-white w-screen h-screen flex items-center justify-center inset-0">
    <div className="relative flex-col items-center justify-center p-6 max-w-lg mx-auto bg-slate-300 rounded-xl shadow-sm z-50">
     <button 
      onClick={() => {copy && setCopy(null) || !copy && onClose(false)} }
     className="absolute top-2 right-2 text-slate-800 hover:text-slate-400">
      <FaArrowRight size={24} />
      </button> 
      {!copy && (
        <div className="w-full space-y-6  ">
          <div className="flex flex-col justify-center items-center text-center">
              <div className="  p-4 max-w-lx">
                <FaBarcode size={80} />
              </div>

            <h3 className="text-xl font-bold text-slate-800">Scan Book Copy</h3>
            <p className="text-sm text-gray-500">Please scan the barcode or enter it manually</p>
          </div>
        
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-400">
               <FaBarcode size={24} />
            </div>

            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              autoFocus
              className="w-full h-16 pl-14 pr-20 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-mono text-xl tracking-widest text-gray-700"
              placeholder="Barcode..."
              onKeyDown={(e) => e.key === 'Enter' && checkBookCopy(inputValue)}
            />

            <button 
             
              onClick={() => checkBookCopy(inputValue)}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-6 bg-[#10b981] hover:bg-green-700 text-white rounded-xl transition-colors flex items-center justify-center disabled:bg-gray-400"
            > 
              {loading ? <span className="animate-spin text-lg">...</span> : <FaArrowRight className="text-lg" />}
            </button>
          </div>
        </div>
      )}

      
    { copy && (
        <div className="w-full animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-[#10b981] bg-blue-50 px-3 py-1 rounded-full">
                  Found: {copy?.barcode}
              </span>
              <button 
                  onClick={() => { setCopy(null); setInputValue(""); }}
                  className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1"
              >
                  Change Copy
              </button>
          </div>
          <LoanForm barcode={copy?.barcode} setCopy={() => setCopy(null)} />
        </div>
      )}
    </div>
    </div>
  );
}