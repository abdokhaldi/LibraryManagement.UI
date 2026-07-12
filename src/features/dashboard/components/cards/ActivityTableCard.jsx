import { ACTIVITIES } from '../../constants';
import ActivityTableHeader from '../table/ActivityTableHeader';
import ActivityTableRow from '../table/ActivityTableRow';

function ActivityTableCard() {
  return (
    <div className="flex flex-col col-span-4 rounded-lg bg-white shadow-gray-300 shadow-md overflow-hidden">
      <div className="flex justify-between items-center h-25 w-full p-4 border-b border-gray-100">
        <h2 className="font-bold text-lg">Recent Activity</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <ActivityTableHeader />
          <tbody>
            {ACTIVITIES.map((activity) => (
              <ActivityTableRow key={activity.id} activity={activity} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityTableCard;
