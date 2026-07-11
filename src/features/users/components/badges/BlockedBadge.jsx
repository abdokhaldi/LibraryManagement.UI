export function BlockedBadge({ isBlocked }) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Blocked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Unblocked
    </span>
  );
}