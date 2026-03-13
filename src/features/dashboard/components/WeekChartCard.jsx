import ChartColumn from './ChartColumn';
import HeaderChart from './HeaderChart';
function WeekChartCard({title}){
  const days=[
   {name: "MON", height:"10"},
   {name: "TUE" , height:"20"}, 
   {name: "WED" , height:"30"},
   {name: "THU", height:"40"}, 
   {name: "FRI", height:"50"},
   {name: "SAT", height:"60"},
   {name: "SUN", height:"70"}
  ];

 
    return (
        <div className="flex flex-col h-80 w-full bg-white rounded-lg shadow-gray-400 shadow-lg col-span-2 p-4">
                        <HeaderChart title={title} />
            <div className="grid grid-cols-7 h-full w-full items-end gap-2 "> 
           {
            days.map((day) => (
          <ChartColumn key={day.name}  dayName={day.name} height={day.height} />
            
           ))
           }
           
            </div>
        </div>
    );
}

export default WeekChartCard;