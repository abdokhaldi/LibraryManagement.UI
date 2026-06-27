import React from "react";

export default function TenantForm({ data, onChange }) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const inputClass = "w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-200";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <form className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tenant Details</h2>

      <div>
        <label className={labelClass}>Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handle}
          className={inputClass}
          placeholder="Enter organization name"
          required
        />
      </div>

      <div>
        <label className={labelClass}>Identifier</label>
        <input
          type="text"
          name="identifier"
          value={data.identifier}
          onChange={handle}
          className={inputClass}
          placeholder="e.g. tenant-id-001"
          required
        />
      </div>
 </form>
  );
}