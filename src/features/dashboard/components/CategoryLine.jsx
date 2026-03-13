

function CategoryLine({categoryName, percentage}){
  const percentageMap = {
    10:{perColor:"w-[10%]", perNumber:"10%"},
    20:{perColor:"w-[20%]", perNumber:"20%"},
    30:{perColor:"w-[30%]", perNumber:"30%"},
    40:{perColor:"w-[40%]", perNumber:"40%"},
    50:{perColor:"w-[50%]", perNumber:"50%"},
    60:{perColor:"w-[60%]", perNumber:"60%"}
  }[percentage];

    return (
        <div className="flex flex-col h-10 w-full ">
            <div className="flex justify-between items-end h-full w-full mb-0">
              <p>{categoryName}</p>
              <p>{percentageMap.perNumber}</p>
            </div>
             <div className="bg-gray-300 w-full h-3 rounded-sm">
              <div className={`bg-green-500 h-full ${percentageMap.perColor} rounded-sm`}></div>
            </div>
         </div>
    );
}

export default CategoryLine;