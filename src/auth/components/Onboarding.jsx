import React, { useState } from "react";
import { FiCheckCircle, FiUser, FiHome, FiArrowLeft, FiArrowRight } from "react-icons/fi";

import TenantForm from "./TenantForm";
import PersonForm from "./PersonForm";
import AdminUserForm from "./AdminUserForm";

const steps = [
  { id: 0, title: "Tenant", icon: <FiHome className="text-xl" /> },
  { id: 1, title: "Person", icon: <FiUser className="text-xl" /> },
  { id: 2, title: "Admin User", icon: <FiCheckCircle className="text-xl" /> },
];

export default function Onboarding({ onCompleted }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tenant: { name: "", identifier: "", defaultLanguage: "", timeZone: "" },
    person: { firstName: "", lastName: "", nationalNumber: "", phone: "", email: "", address: "", city: "", gender: "M" },
    adminUser: { username: "", password: "", roleId: 1, roleName: "Admin", personId: "" },
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
    console.log("Submitting payload:", formData);
    onCompleted();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 flex items-center justify-center p-4">
      {/* البطاقة الرئيسية */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-white/50">
        
        {/* Header Steps */}
        <div className="flex justify-between mb-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                currentStep === step.id ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30" : 
                currentStep > step.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
              }`}>
                {step.icon}
              </div>
              <span className={`mt-2 text-sm font-semibold ${currentStep === step.id ? "text-teal-800" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[300px]">
          {currentStep === 0 && <TenantForm data={formData.tenant} onChange={(v) => updateSection("tenant", v)} />}
          {currentStep === 1 && <PersonForm data={formData.person} onChange={(v) => updateSection("person", v)} />}
          {currentStep === 2 && <AdminUserForm data={formData.adminUser} onChange={(v) => updateSection("adminUser", v)} />}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <FiArrowLeft /> Previous
          </button>

          <button
            onClick={currentStep === steps.length - 1 ? handleFinalSubmit : next}
            className="flex items-center gap-2 px-8 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-600/20 active:scale-95"
          >
            {currentStep === steps.length - 1 ? "Register" : "Next"} <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}