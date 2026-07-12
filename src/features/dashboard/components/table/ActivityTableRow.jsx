import { getStatusColor } from '../../utils/dashboardHelpers';

function ActivityTableRow({ activity }) {
  const statusColor = getStatusColor(activity.status);

  return (
    <tr>
      <td className="p-4">{activity.memberName}</td>
      <td>{activity.bookTitle}</td>
      <td>{activity.action}</td>
      <td>
        <span className={statusColor}>{activity.status}</span>
      </td>
      <td>{activity.time}</td>
    </tr>
  );
}

export default ActivityTableRow;