import StatCard from "../../../commonCards/StatCard";
import { FaBook, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export function LoanStats({ loans }) {
  const stats = [
    {
      label: "Total Loans",
      value: loans.length,
      icon: <FaBook size={18} />,
      color: "green",
    },
    {
      label: "Borrowed",
      value: loans.filter(l => l.status === "Borrowed").length,
      icon: <FaClock size={18} />,
      color: "teal",
    },
    {
      label: "Overdue",
      value: loans.filter(l => l.status === "Overdue").length,
      icon: <FaExclamationTriangle size={18} />,
      color: "gray",
    },
    {
      label: "Returned",
      value: loans.filter(l => l.status === "Returned").length,
      icon: <FaCheckCircle size={18} />,
      color: "emerald",
    },
  ];

  return (
    <div className="mx-auto mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
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