import { ACTIVITY_STATUS_STYLES } from '../../constants';

export function ActivityStatusBadge({ status }) {
  const style = ACTIVITY_STATUS_STYLES[status] || ACTIVITY_STATUS_STYLES.Completed;
  
  return (
    <span className={`px-3 py-1 rounded-sm text-[10px] font-bold   ${style}`}>
      {status}
    </span>
  );
}