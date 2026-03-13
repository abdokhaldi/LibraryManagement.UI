


function ChartColumn({dayName="MoN", height}){
   
    const heightPercentageMap = {
    10:"h-[10%]",
     20:"h-[20%]",
      30:"h-[30%]",
       40:"h-[40%]",
        50:"h-[50%]",
         60:"h-[60%]",
          70:"h-[70%]"

    }[height];

    return (
             <div className="flex flex-col h-full justify-end items-center">
                 <p>{`${height}%`}</p>
                 <div className={`${heightPercentageMap} w-full bg-green-500 rounded-md hover:bg-green-300 transition-all`}></div>
                 <p className="font-bold text-md">{dayName}</p>
                 </div>
    );
}

export default ChartColumn;