import React, { useState } from "react";
import { FiCheckCircle, FiUser, FiHome, FiArrowLeft, FiArrowRight } from "react-icons/fi";

import TenantForm from "./TenantForm";
import PersonForm from "./PersonForm";
import AdminUserForm from "./AdminUserForm";
import { registerOwner } from "../../services/authService";

const steps = [
  { id: 0, title: "Tenant", icon: <FiHome className="text-xl" /> },
  { id: 1, title: "Person", icon: <FiUser className="text-xl" /> },
  { id: 2, title: "Admin User", icon: <FiCheckCircle className="text-xl" /> },
];

export default function Onboarding({ onCompleted }) {
  const [currentStep, setCurrentStep] = useState(0);
 
  const [formData, setFormData] = useState({
    tenant: { name: "", identifier: "", defaultLanguage: "", timeZone: "" },
    person: {
      firstName: "", lastName: "", nationalNumber: "", phone: "", email: "",
      address: "", city: "", gender: "M",
    },
    adminUser: {
      username: "", password: "", roleId: 1, roleName: "Admin", personId: null,
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
    try {
      const result = await registerOwner(formData);
      if (result.success) {
        alert(result.message);
        onCompleted();
        return;
      }
      alert(result.message);
    } catch (ex) {
      console.error("Error during final submission:", ex);
    }
  };

 
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10">
        
        {/* إضافة العنوان والنص التعريفي هنا */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Setup Your Library</h2>
          <p className="text-slate-500 text-sm">Follow these simple steps to initialize your digital library workspace.</p>
        </div>

        {/* خطوات التقديم */}
        <div className="flex justify-between mb-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`p-4 rounded-full transition-all duration-300 ${
                currentStep === step.id 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30" 
                  : currentStep > step.id 
                  ? "bg-emerald-600 text-white" 
                  : "bg-slate-100 text-slate-400"
              }`}>
                {step.icon}
              </div>
              <span className={`mt-2 text-xs md:text-sm font-semibold ${currentStep === step.id ? "text-emerald-700" : "text-slate-400"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* مساحة المحتوى */}
        <div className="min-h-[300px]">
          {currentStep === 0 && <TenantForm data={formData.tenant} onChange={(v) => updateSection("tenant", v)} />}
          {currentStep === 1 && <PersonForm data={formData.person} onChange={(v) => updateSection("person", v)} />}
          {currentStep === 2 && <AdminUserForm data={formData.adminUser} onChange={(v) => updateSection("adminUser", v)} />}
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition font-medium"
          >
            <FiArrowLeft /> Previous
          </button>

          <button
            onClick={currentStep === steps.length - 1 ? handleFinalSubmit : next}
            className="flex items-center gap-2 px-8 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 active:scale-[0.98] font-semibold"
          >
            {currentStep === steps.length - 1 ? "Register" : "Next"} <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
