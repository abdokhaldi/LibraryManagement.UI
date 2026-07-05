

function StatCard({ label, value, icon, color }) {
  const colorMap = {
    green: "bg-white text-green-800 border-white shadow-2xs",
    emerald: "bg-white text-green-800 border-white shadow-2xs",
    gray: "bg-white text-green-800 border-white shadow-2xs",
    teal: "bg-white text-green-800 border-white shadow-2xs",
  };
  const iconBgMap = {
    green: " bg-blue-300 text-white",
    emerald: "bg-green-300 text-white",
    gray: "bg-red-500 text-white",
    teal: "bg-yellow-300 text-white",
  };

  return (
    <div
      className={`flex items-start justify-between col-span-4 sm:col-span-2 md:col-span-2 lg:col-span-1 gap-3 rounded-xl border p-4 ${colorMap[color] || colorMap.green}`}
    >
      <div className="flex-1 flex-col items-center justify-between">
        
        <p className="font-bold text-gray-300">{label.toUpperCase()}</p>
        <p className="text-3xl font-bold">{value?value:0}</p>
      </div>
      
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBgMap[color] || iconBgMap.green}`}
      >
        {icon}
      </div>

    </div>
  );
}
export default StatCard;