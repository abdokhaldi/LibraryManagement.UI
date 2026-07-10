import { getInitials, getAvatarColor } from "../../utils/helpers";

export function PersonAvatar({ person, size = "h-9 w-9", textSize = "text-xs" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${getAvatarColor(person.personID)} ${size}`}
    >
      {getInitials(person.firstName, person.lastName)}
    </div>
  );
}