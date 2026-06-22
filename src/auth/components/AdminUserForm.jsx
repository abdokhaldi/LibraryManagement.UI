import React from "react";
import { FiLock, FiUser } from "react-icons/fi";

export default function AdminUserForm({ data, onChange }) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const inputClass = "w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-200 pl-10";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <form className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin User Account</h2>

      <div className="relative">
        <label className={labelClass}>Username</label>
        <div className="relative flex items-center">
          <FiUser className="absolute left-3 text-gray-400" />
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handle}
            className={inputClass}
            placeholder="Choose a username"
            required
          />
        </div>
      </div>

      <div className="relative">
        <label className={labelClass}>Password</label>
        <div className="relative flex items-center">
          <FiLock className="absolute left-3 text-gray-400" />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handle}
            className={inputClass}
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      {/* Hidden Fields */}
      <input type="hidden" name="roleId" value={data.roleId} />
      <input type="hidden" name="roleName" value={data.roleName} />
      <input type="hidden" name="personId" value={data.personId} />
    </form>
  );
}