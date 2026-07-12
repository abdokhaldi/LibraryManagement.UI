function ActivityTableHeader() {
  return (
    <thead>
      <tr className="bg-gray-50 border-b border-gray-100">
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Member Name</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Title</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
      </tr>
    </thead>
  );
}

export default ActivityTableHeader;
