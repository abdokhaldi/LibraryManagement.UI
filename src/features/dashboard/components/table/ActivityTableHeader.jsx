function ActivityTableHeader() {
  return (
    <thead>
      <tr className="h-12 bg-gray-200 text-left">
        <th className="p-2">Member Name</th>
        <th>Book Title</th>
        <th>Action</th>
        <th>Status</th>
        <th>Time</th>
      </tr>
    </thead>
  );
}

export default ActivityTableHeader;