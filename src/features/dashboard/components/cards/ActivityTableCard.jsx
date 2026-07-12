import { ACTIVITIES } from '../../constants';
import ActivityTableHeader from '../table/ActivityTableHeader';
import ActivityTableRow from '../table/ActivityTableRow';

function ActivityTableCard() {
  return (
    <div className="flex flex-col col-span-4 rounded-lg bg-white shadow-gray-300 shadow-md pb-4">
      <div className="flex justify-between items-center h-25 w-full p-4">
        <h2 className="font-bold text-lg">Recent Activity</h2>
      </div>
      <table className="w-full">
        <ActivityTableHeader />
        <tbody>
          {ACTIVITIES.map((activity) => (
            <ActivityTableRow key={activity.id} activity={activity} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityTableCard;