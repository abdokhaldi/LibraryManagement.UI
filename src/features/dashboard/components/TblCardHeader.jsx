

function TblCardHeader(){
 
    return (
         <div className="flex justify-between items-center h-25 w-full p-4"> 
             <h2 className="font-bold text-lg">Recent Activity</h2>
             <a className="font-bold text-lg text-green-400 cursor-pointer hover:text-green-300 hover:shadow-green-400 hover:shadow-md hover:translate-0.5 active:bg-green-400 active:translate-0.5 active:text-white">View All</a>
            </div>
    );
}

export default TblCardHeader;