import { ActivityStatusBadge } from '../badges/ActivityStatusBadge';

function ActivityTableRow({ activity }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-medium text-gray-900">{activity.memberName}</td>
      <td className="px-4 py-3 text-gray-700">{activity.bookTitle}</td>
      <td className="px-4 py-3 text-gray-700">{activity.action}</td>
      <td className="px-4 py-3">
        <ActivityStatusBadge status={activity.status} />
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm">{activity.time}</td>
    </tr>
  );
}

export default ActivityTableRow;
