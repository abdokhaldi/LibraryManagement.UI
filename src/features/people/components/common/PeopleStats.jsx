import StatCard from "../../../commonCards/StatCard";
import { MdPeopleAlt, MdPersonOff } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { FaVenusMars } from "react-icons/fa";

export function PeopleStats({ stats }) {
  const statCards = [
    {
      label: "Total People",
      value: stats.total,
      icon: <MdPeopleAlt className="h-5 w-5" />,
      color: "green",
    },
    {
      label: "Users",
      value: stats.users,
      icon: <HiOutlineUser className="h-5 w-5" />,
      color: "blue",
    },
    {
      label: "Members",
      value: stats.members,
      icon: <RiGroupLine className="h-5 w-5" />,
      color: "purple",
    },
    {
      label: "No Association",
      value: stats.none,
      icon: <MdPersonOff className="h-5 w-5" />,
      color: "gray",
    },
    {
      label: "Male",
      value: stats.males,
      icon: <FaVenusMars className="h-5 w-5" />,
      color: "blue",
    },
    {
      label: "Female",
      value: stats.females,
      icon: <FaVenusMars className="h-5 w-5" />,
      color: "pink",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mb-6">
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