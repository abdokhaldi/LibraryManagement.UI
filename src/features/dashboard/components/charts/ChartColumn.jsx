import { getHeightClass } from '../../utils/dashboardHelpers';

function ChartColumn({ dayName = "MON", height }) {
  const heightClass = getHeightClass(height);

  return (
    <div className="flex flex-col h-full justify-end items-center">
      <p>{`${height}%`}</p>
      <div className={`${heightClass} w-full bg-green-500 rounded-md hover:bg-green-300 transition-all`}></div>
      <p className="font-bold text-md">{dayName}</p>
    </div>
  );
}

export default ChartColumn;