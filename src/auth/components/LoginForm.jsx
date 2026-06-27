import React, { useState } from "react";

export default function LoginForm() {
 
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const inputClass = "w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition duration-200";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1";

  return (
    <form className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tenant Details</h2>

      <div>
        <label className={labelClass}>Username/Email</label>
        <input
          type="text"
          name="Username/Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className={inputClass}
          placeholder="Enter your username or email"
          required
        />
      </div>

      <div>
        <label className={labelClass}>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="......"
          required
        />
      </div>
 </form>
  );
}