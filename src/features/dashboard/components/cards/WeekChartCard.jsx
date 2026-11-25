import CardHeader from '../common/CardHeader';
import ChartColumn from '../charts/ChartColumn';

function WeekChartCard({ title, weeklyData }) {
  return (
    <div className="flex flex-col col-span-2 h-80 w-full sm:col-span-4 md:col-span-4 lg:col-span-2 bg-white rounded-lg shadow-gray-300 shadow-md p-4">
      <CardHeader title={title} />
      <div className="grid grid-cols-7 h-full w-full items-end gap-2">
        {weeklyData?.map((day) => (
          <ChartColumn key={day.dayName} dayName={day.dayName} height={Math.round((day.loansCount / (Math.max(...weeklyData.map(d => d.loansCount), 1)) * 100))} />
        ))}
      </div>
    </div>
  );
}

export default WeekChartCard;