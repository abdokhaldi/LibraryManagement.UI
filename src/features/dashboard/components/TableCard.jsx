import TblCardHeader from "./TblCardHeader";

function TableCard({activities}){

    
    return (
       <div className="flex flex-col col-span-4 rounded-lg bg-white shadow-gray-300 shadow-md pb-4" >
        <TblCardHeader/>

         <table className="w-full">
            <thead >
                <tr className="h-12 bg-gray-200 text-left">
                    <th className="p-2">Member Name</th>
                    <th>Book Title</th>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    activities.map((activity) => 
                    (
                 <tr>
                    <td className="p-4">{activity.memberName}</td>
                    <td>{activity.bookTitle}</td>
                    <td>{activity.action}</td>
                    <td><span className={activity.status==="borrowed"?"bg-red-500": activity.status==="Completed"?" bg-red-300" :activity.status=="available"?"bg-blue-600":"bg-green-400"}>{activity.status}</span></td>
                    <td> {activity.time}</td>
              </tr>
                    ))
                }
                
                
            </tbody>
         </table>
         
         
       </div>
    );
}

export default TableCard;