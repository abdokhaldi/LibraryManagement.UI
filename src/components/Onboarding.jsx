import React, { useState } from "react";
import { FiCheckCircle, FiUser, FiHome } from "react-icons/fi";

import TenantForm from "./TenantForm";
import PersonForm from "./PersonForm";
import AdminUserForm from "./AdminUserForm";

const steps = [
  { id: 0, title: "Tenant", icon: <FiHome className="text-2xl" /> },
  { id: 1, title: "Person", icon: <FiUser className="text-2xl" /> },
  { id: 2, title: "Admin User", icon: <FiCheckCircle className="text-2xl" /> },
];

export default function Onboarding({onCompleted}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // TenantForCreationDTO
    tenant: { name: "", identifier: "", defaultLanguage: "", timeZone: "" },

    // PersonForCreationDTO
    person: {
      firstName: "",
      lastName: "",
      nationalNumber: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      gender: "M",
    },

    // UserForAdminCreationDTO
    adminUser: {
      username: "",
      password: "",
      roleId: 1,
      roleName: "Admin",
      personId: "", // will be filled after person creation
    },
  });

  const updateSection = (section, values) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...values },
    }));
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleFinalSubmit = async () => {
    // TODO: replace with real API calls (POST tenant → POST person → POST adminUser)
    console.log("Submitting payload:", formData);
    alert("All data logged to console – replace with your API call.");
     
    onCompleted();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header with step indicators */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 flex flex-col items-center ${
              currentStep === step.id ? "text-blue-600 font-semibold" : "text-gray-400"
            }`}
          >
            {step.icon}
            <span className="mt-1">{step.title}</span>
            {currentStep > step.id && (
              <span className="text-xs text-green-500 mt-0.5">✓ Completed</span>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="space-y-6">
        {currentStep === 0 && (
          <TenantForm data={formData.tenant} onChange={(v) => updateSection("tenant", v)} />
        )}
        {currentStep === 1 && (
          <PersonForm data={formData.person} onChange={(v) => updateSection("person", v)} />
        )}
        {currentStep === 2 && (
          <AdminUserForm
            data={formData.adminUser}
            onChange={(v) => updateSection("adminUser", v)}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleFinalSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Register
          </button>
        )}
      </div>
    </div>
  );
}