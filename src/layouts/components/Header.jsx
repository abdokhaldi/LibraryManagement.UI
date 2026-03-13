
import {FaDownload} from 'react-icons/fa';


 function Header(){
   
    return (
        <>
     <div className="bg-white h-20 flex items-center justify-between p-8">
      <h2 className="font-bold text-lg"> Dashboard Analytics</h2>
        <div className="flex items-center h-full gap-2">
            <div className="flex items-center justify-between gap-0.5 rounded-lg w-30 bg-gray-200 text-black h-13 p-2 ">
             <p >Last 30 days</p>
             <input type="checkbox"  />
            </div>
            <button className="bg-green-200 font-bold  rounded-lg text-white  p-2" >
                <FaDownload className='h-13 w-8 text-black'/>
            </button>

        </div>
     </div>
 </>

    );
}
export default Header;

