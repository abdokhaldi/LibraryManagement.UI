import { useEffect, useState } from 'react';
import { FaTimes, FaMoneyBillWave, FaHandHoldingHeart } from 'react-icons/fa';


export default function ViewFinesModal({ isOpen, onClose, borrowingId }) {
  const [finesData, setFinesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [takeWaive, setTakeWaive] = useState(false);


  const fetchFinesHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5016/api/Fines?BorrowingID=${borrowingId}`);
        if (res.ok) {
          const data = await res.json();
          setFinesData(Array.isArray(data) ? data : []);
        } else {
          setError('Failed to load fines history');
        }
      } catch (err) {
        setError('Error fetching fines: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    if (!isOpen || !borrowingId) return;
    
    fetchFinesHistory();
  }, [isOpen, borrowingId]);
 
 const handlePay = async (id)=> {
  try{
    const res = await fetch(`http://localhost:5016/api/fines/${id}/Pay`, {
      method:'PATCH',
      headers:{
        "Content-Type":"application/json"
      },
    });

    if(res.ok){
       console.log("fine paid succeessfully");
        fetchFinesHistory();
    }
    console.log("fine not paid");

  }catch(error){
   console.log("an error occured while paying the fine: " , error)
  }
 }
 
 const [waiveReason, setWaiveReason] = useState(null);
 const [fineId ,setFineId] = useState(0);

 const handleWaive = async (id)=> {
  if(!waiveReason) return;
  if(!fineId) return;
  try{
    const res = await fetch(`http://localhost:5016/api/Fines/${id}/Waive`, {
      method:'PATCH',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(waiveReason),
    });
     
    let data = null;
    let contentType = res.headers.get("content-type");
    if(contentType && contentType.includes("application/json")){
       data = await res.json();
    }
   
    if(res.ok){
       console.log("fine waived succeessfully");
      fetchFinesHistory(); 
      setTakeWaive(false);
        
    }else{

       console.log("Server error: ", data?.message || "something went wrong");
    }
   

  }catch(error){
   console.log( "Network error: ", error)
  }
 }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Fines History</h2>
            <p className="text-sm text-slate-500">Manage penalties for Borrowing #{borrowingId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 text-slate-500 rounded-full transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="text-slate-500 font-medium">Retrieving records...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
              <p className="font-bold text-lg">Oops!</p>
              <p>{error}</p>
            </div>
          ) : finesData.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
              <p className="text-slate-500 italic">No fines recorded for this borrowing session.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 uppercase text-xs font-bold tracking-wider">
                    <th className="px-4 py-4">Full Name</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Created</th>
                    <th className="px-4 py-4">Paid At</th>
                    <th className="px-4 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {finesData.map((fine) => (
                    <tr key={fine.fineID} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-slate-700">{fine.fullName}</td>
                      <td className="px-4 py-4 font-bold text-red-600">
                        ${fine.amount?.toFixed(2) || '0.00'}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          fine.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {fine.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600 text-sm">
                        {new Date(fine.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-slate-600 text-sm">
                        {fine.paidAt ? new Date(fine.paidAt).toLocaleDateString() : <span className="text-slate-300">N/A</span>}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2 justify-center">
                          <button 
                          onClick={() => handlePay(fine.fineID)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded shadow-sm transition-all">
                            <FaMoneyBillWave /> Pay
                          </button>
                          <button
                            onClick={() => {setTakeWaive(!takeWaive); setFineId(fine.fineID) }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold rounded shadow-sm transition-all"
                          >
                            <FaHandHoldingHeart /> Waive
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Waive Section */}
          {takeWaive && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex flex-col md:flex-row items-center gap-4 animate-in slide-in-from-top-2">
              <div className="flex-1 w-full">
                <label className="block text-sm font-bold text-amber-800 mb-1">Reason for waiving fine:</label>
                <input 
                  type="text" 
                  value={waiveReason}
                  className="w-full border border-amber-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none" 
                  placeholder="e.g. Medical emergency, System error..." 
                  onChange={(e) => setWaiveReason(e.target.value)}
               />
              </div>
              <button
               onClick={() => handleWaive(fineId)}
               className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all self-end">
                Confirm Waive
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 font-bold transition-all shadow-sm"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}