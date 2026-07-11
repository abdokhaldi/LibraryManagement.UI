import { MdAdminPanelSettings, MdPeopleAlt } from "react-icons/md";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { ROLE_STYLES } from "../../constants/index.js";

const ROLE_ICONS = {
  Admin: <MdAdminPanelSettings className="h-3 w-3" />,
  Librarian: <HiOutlineShieldCheck className="h-3 w-3" />,
  Staff: <MdPeopleAlt className="h-3 w-3" />,
};

export function RoleBadge({ roleName }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-semibold ring-1 ${
        ROLE_STYLES[roleName] || ROLE_STYLES.Staff
      }`}
    >
      {ROLE_ICONS[roleName] || null}
      {roleName}
    </span>
  );
}