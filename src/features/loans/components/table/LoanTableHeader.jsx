export function LoanTableHeader() {
  return (
    <thead>
      <tr className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
        <th className="px-6 py-4">Book Info</th>
        <th className="px-6 py-4">Member</th>
        <th className="px-6 py-4 text-center">Timeline</th>
        <th className="px-6 py-4 text-center">Fees & Fines</th>
        <th className="px-6 py-4 text-center">Status</th>
        <th className="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
  );
}