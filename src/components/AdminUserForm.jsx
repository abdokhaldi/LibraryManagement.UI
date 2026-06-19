import React from "react";

export default function AdminUserForm({ data, onChange }) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Admin User Account</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handle}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handle}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {/* Role fields are hidden because RoleName is always “Admin”. RoleID can stay default (1) */}
      <input type="hidden" name="roleId" value={data.roleId} />
      <input type="hidden" name="roleName" value={data.roleName} />
      <input type="hidden" name="personId" value={data.personId} />
    </form>
  );
}