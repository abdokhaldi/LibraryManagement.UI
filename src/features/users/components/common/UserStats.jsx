import StatCard from "../../../commonCards/StatCard.jsx";
import { HiOutlineCheck } from "react-icons/hi";
import { MdPeopleAlt, MdPersonOff, MdBlock } from "react-icons/md";

export function UserStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-4">
      <StatCard
        label="Total Users"
        value={stats.total}
        icon={<MdPeopleAlt className="h-5 w-5" />}
        color="green"
      />
      <StatCard
        label="Active"
        value={stats.active}
        icon={<HiOutlineCheck className="h-5 w-5" />}
        color="emerald"
      />
      <StatCard
        label="Inactive"
        value={stats.inactive}
        icon={<MdPersonOff className="h-5 w-5" />}
        color="gray"
      />
      <StatCard
        label="Blocked"
        value={stats.blocked}
        icon={<MdBlock className="h-5 w-5" />}
        color="red"
      />
    </div>
  );
}