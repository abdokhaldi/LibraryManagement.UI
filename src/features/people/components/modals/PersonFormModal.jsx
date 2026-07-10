import { useState, useEffect } from "react";
import { HiOutlineX, HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineCheck } from "react-icons/hi";
import { FaIdCard, FaVenusMars, FaUserTag } from "react-icons/fa";

const GENDER_OPTIONS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const ASSOCIATION_OPTIONS = [
  { value: "user", label: "User" },
  { value: "member", label: "Member" },
  { value: "none", label: "None" },
];

const initialForm = {
  firstName: "",
  lastName: "",
  nationalNumber: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  gender: "",
  association: "none",
};

// ── InputField Component ──
const InputField = ({ label, name, value, onChange, type = "text", placeholder, error, icon, required = true }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-gray-50/50 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 ${
          icon ? "pl-10 pr-4" : "px-4"
        } ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-200 focus:border-green-500 focus:ring-green-500/20"
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

// ── SelectField Component ──
const SelectField = ({ label, name, value, onChange, options, placeholder, error, icon, required = true }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full appearance-none rounded-lg border bg-gray-50/50 py-2.5 text-sm text-gray-900 outline-none transition-all focus:ring-2 ${
          icon ? "pl-10 pr-4" : "px-4"
        } ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-200 focus:border-green-500 focus:ring-green-500/20"
        } ${!value ? "text-gray-400" : ""}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default function PersonFormModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(initialForm);
      setErrors({});
    }
  }, [isOpen]);

  const resetAndClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.nationalNumber.trim()) errs.nationalNumber = "National number is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.gender) errs.gender = "Gender is required";
    if (form.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errs.email = "Invalid email format";
      }
    } else {
      errs.email = "Email is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    if (validate()) {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        nationalNumber: form.nationalNumber.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        gender: form.gender,
        association: form.association,
      };
      onSubmit(payload);
      resetAndClose();
    }
  };

  if (!isOpen) return null;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={resetAndClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FaUserTag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Add New Person</h2>
              <p className="text-xs text-gray-500">
                Fill in the personal information for the new person
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        {/* ── Form Content ────────────────────────────────────────────────── */}
        <div className="px-6 py-5">
          <div className="space-y-5">
            <div className="rounded-lg bg-green-50/50 border border-green-100 px-4 py-3">
              <p className="text-xs font-medium text-green-700">
                Fill in all required fields to add a new person to the system.
              </p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                error={errors.firstName}
                icon={<HiOutlineUser className="h-4 w-4" />}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                error={errors.lastName}
                icon={<HiOutlineUser className="h-4 w-4" />}
              />
            </div>

            {/* National Number & Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="National Number"
                name="nationalNumber"
                value={form.nationalNumber}
                onChange={handleChange}
                placeholder="e.g. AB123456"
                error={errors.nationalNumber}
                icon={<FaIdCard className="h-4 w-4" />}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+212 6XX XXX XXX"
                error={errors.phone}
                icon={<HiOutlinePhone className="h-4 w-4" />}
              />
            </div>

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="person@example.com"
              error={errors.email}
              icon={<HiOutlineMail className="h-4 w-4" />}
            />

            {/* Address & City */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address"
                error={errors.address}
                icon={<HiOutlineLocationMarker className="h-4 w-4" />}
              />
              <InputField
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City name"
                error={errors.city}
                icon={<HiOutlineLocationMarker className="h-4 w-4" />}
              />
            </div>

            {/* Gender & Association */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={GENDER_OPTIONS}
                placeholder="Select gender"
                error={errors.gender}
                icon={<FaVenusMars className="h-4 w-4" />}
              />
              <SelectField
                label="Association"
                name="association"
                value={form.association}
                onChange={handleChange}
                options={ASSOCIATION_OPTIONS}
                placeholder="Select association"
                icon={<FaUserTag className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <button
            onClick={resetAndClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-600"
          >
            <HiOutlineCheck className="h-4 w-4" />
            Add Person
          </button>
        </div>
      </div>
    </div>
  );
}