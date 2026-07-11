export function UserDetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}