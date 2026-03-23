

function TotalAnalyticsCard({title, value, percentage,color}){
 
  const colorMap = {
    red:"bg-red-500",
    green:"bg-green-300",
    amber:"bg-blue-300",
    yellow:"bg-yellow-300"
  };
  
    const colorClass = colorMap[color] || "bg-gray-400";
    return (
    
    <div className="grid grid-cols-5 grid-rows-5 h-40 w-full p-4  rounded-br-[4rem] rounded-tl-4xl bg-white shadow-gray-300 shadow-md col-span-1">
     <div className="col-span-4 row-span-2">
         <h1 className="font-bold text-gray-300">
          {title}
        </h1> 
        </div>
     <div className={`${colorClass} col-span-1 h-8 w-full rounded-md`}></div>
     <div className="col-span-4 row-span-3 h-full w-full"> 
       <h1 className="font-bold text-[2rem]">{value}</h1> 
       <p className="text-green-400">{percentage}</p>
     </div>
    </div>
   
 );
}
export default TotalAnalyticsCard;