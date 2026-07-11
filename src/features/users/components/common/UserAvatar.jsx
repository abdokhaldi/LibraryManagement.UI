import { getInitials, getAvatarColor } from "../../utils/userHelpers.js";

export function UserAvatar({ user, size = "md" }) {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
  };

  const fullName = user?.person?.fullName || "";

  return (
    <div
      className={`flex ${sizeClasses[size]} shrink-0 items-center justify-center rounded-full font-bold ${getAvatarColor(user?.userID || "")}`}
    >
      {getInitials(fullName)}
    </div>
  );
}