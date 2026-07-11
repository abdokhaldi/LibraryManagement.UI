import { getInitials, getAvatarColor } from "../../utils/memberHelpers";

export function MemberAvatar({ member, size = "md" }) {
  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${sizeClasses[size] || sizeClasses.md} ${getAvatarColor(member.memberID)}`}
    >
      {getInitials(member.person?.fullName || "")}
    </div>
  );
}