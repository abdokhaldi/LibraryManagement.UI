import React from "react";

export default function PersonForm({ data, onChange }) {
 
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  // تنسيقات موحدة لضمان التناسق البصري
  const inputClass = "w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-200";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <form className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Person Details</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name</label>
          <input type="text" name="firstName" value={data.firstName} onChange={handle} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input type="text" name="lastName" value={data.lastName} onChange={handle} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>National Number</label>
        <input type="text" name="nationalNumber" value={data.nationalNumber} onChange={handle} className={inputClass} required />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone</label>
          <input type="tel" name="phone" value={data.phone} onChange={handle} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" name="email" value={data.email} onChange={handle} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>Address</label>
        <input type="text" name="address" value={data.address} onChange={handle} className={inputClass} required />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>City</label>
          <input type="text" name="city" value={data.city} onChange={handle} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select name="gender" value={data.gender} onChange={handle} className={`${inputClass} bg-gray-50`}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
      </div>
    </form>
  );
}