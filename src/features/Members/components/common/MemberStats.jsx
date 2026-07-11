import StatCard from "../../../commonCards/StatCard";
import { MdPeopleAlt, MdPersonOff } from "react-icons/md";
import { HiOutlineBookOpen, HiOutlineCheck } from "react-icons/hi";

export function MemberStats({ stats }) {
  const statCards = [
    {
      label: "Total Members",
      value: stats.total,
      icon: <MdPeopleAlt className="h-5 w-5" />,
      color: "green",
    },
    {
      label: "Active",
      value: stats.active,
      icon: <HiOutlineCheck className="h-5 w-5" />,
      color: "emerald",
    },
    {
      label: "Inactive",
      value: stats.inactive,
      icon: <MdPersonOff className="h-5 w-5" />,
      color: "gray",
    },
    {
      label: "Books Borrowed",
      value: stats.totalBorrowed,
      icon: <HiOutlineBookOpen className="h-5 w-5" />,
      color: "teal",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {statCards.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}