import React from "react";

export default function TenantForm({ data, onChange }) {
  const handle = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Tenant Details</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handle}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Identifier</label>
        <input
          type="text"
          name="identifier"
          value={data.identifier}
          onChange={handle}
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Default Language</label>
          <input
            type="text"
            name="defaultLanguage"
            value={data.defaultLanguage}
            onChange={handle}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time Zone</label>
          <input
            type="text"
            name="timeZone"
            value={data.timeZone}
            onChange={handle}
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </form>
  );
}