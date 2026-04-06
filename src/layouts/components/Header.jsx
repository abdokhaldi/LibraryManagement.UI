
import {FaFileDownload} from 'react-icons/fa';


 function Header(){
   
    return (
        <>
     <div className="bg-white border-b border-gray-300 h-20 flex items-center justify-between p-8">
      <h2 className="font-bold text-lg"><button ></button></h2>
        <div className="flex items-center h-full gap-4">
            <div className="flex items-center justify-between gap-0.5 rounded-lg w-30 bg-gray-200 text-black h-13 p-2 ">
             <p >Last 30 days</p>
             <input type="checkbox"  />
            </div>
            <button className="bg-white font-bold  rounded-lg  p-2" >
                <FaFileDownload className='h-13 w-8 text-black'/>
            </button>

        </div>
     </div>
 </>

    );
}
export default Header;

