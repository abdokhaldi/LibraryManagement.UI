import { ActivityStatusBadge } from '../badges/ActivityStatusBadge';

function ActivityTableRow({ activity }) {
  // Format time from ISO string to readable format
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 font-medium text-gray-900">{activity.memberName}</td>
      <td className="px-4 py-3 text-gray-700">{activity.bookTitle}</td>
      <td className="px-4 py-3 text-gray-700">{activity.action}</td>
      <td className="px-4 py-3">
        <ActivityStatusBadge status={activity.status}  />
      </td>
      <td className="px-4 py-3 text-gray-500 text-sm">{formatTime(activity.time)}</td>
    </tr>
  );
}

export default ActivityTableRow;
