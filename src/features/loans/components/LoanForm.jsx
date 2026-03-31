

export default function LoanForm({barcode, setCopy}){

    return (
        <div action="" className="absolute flex justify-center items-center top-0 left-0 w-full h-full">
          <form className="flex flex-col h-fit  w-[40%] rounded-md p-10 gap-5 bg-white shadow-md shadow-gray-500">
            <div>
              <label htmlFor="" className="font-bold text-lg">Book copy :</label>
              
              <input 
                type="text" 
                value={barcode} 
                disabled 
                className="w-full border border-gray-400 rounded-md h-15 p-2 bg-gray-100 " 
              />
            </div>
            
            <div>
              <label htmlFor="">Member :</label>
              <input type="text" placeholder="enter national number" className="border-gray-400 w-full border rounded-md h-15 p-2" />
            </div>

            <div>
              <label htmlFor="">End Date :</label>
              <input type="date" className="border-gray-400 w-full border rounded-md h-15 p-2" />
            </div>
            
            <div className="flex justify-between w-full h-12 gap-2 mt-4">
              
              <button type="button" onClick={setCopy} className="bg-gray-400 w-[30%] text-white rounded">
                Cancel
              </button>
              <button type="submit" className="bg-green-500 w-[60%] text-white rounded">
                Confirm
              </button>
            </div>
          </form>
        </div>
    );
}