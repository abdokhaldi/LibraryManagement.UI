import { useState } from "react";
import {
  HiOutlineX,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineCheck,
} from "react-icons/hi";
import { MdPersonAdd } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const ROLES = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Librarian" },
  { id: 3, name: "Staff" },
];

const GENDER_OPTIONS = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const STEPS = [
  { key: "person", label: "Person Info", icon: HiOutlineUser },
  { key: "user", label: "User Account", icon: HiOutlineShieldCheck },
];

const initialPersonForm = {
  firstName: "",
  lastName: "",
  nationalNumber: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  gender: "",
};

const initialUserForm = {
  username: "",
  password: "",
  confirmPassword: "",
  roleID: "",
};

export default function UserFormModal({ isOpen, onClose, mode, user, onSubmit }) {
  const [step, setStep] = useState(0);
  const [personForm, setPersonForm] = useState(initialPersonForm);
  const [userForm, setUserForm] = useState(initialUserForm);
  const [errors, setErrors] = useState({});

  const isEdit = mode === "edit";

  // Reset form when modal opens
  const resetAndClose = () => {
    setStep(0);
    setPersonForm(initialPersonForm);
    setUserForm(initialUserForm);
    setErrors({});
    onClose();
  };

  // ── Validation ──────────────────────────────────────────────────────────
  const validatePersonStep = () => {
    const errs = {};
    if (!personForm.firstName.trim()) errs.firstName = "First name is required";
    if (!personForm.lastName.trim()) errs.lastName = "Last name is required";
    if (!personForm.nationalNumber.trim()) errs.nationalNumber = "National number is required";
    if (!personForm.phone.trim()) errs.phone = "Phone is required";
    if (!personForm.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personForm.email)) {
      errs.email = "Invalid email format";
    }
    if (!personForm.address.trim()) errs.address = "Address is required";
    if (!personForm.city.trim()) errs.city = "City is required";
    if (!personForm.gender) errs.gender = "Gender is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateUserStep = () => {
    const errs = {};
    if (!userForm.username.trim()) errs.username = "Username is required";
    if (!isEdit) {
      if (!userForm.password) errs.password = "Password is required";
      else if (userForm.password.length < 6) errs.password = "Password must be at least 6 characters";
      if (!userForm.confirmPassword) errs.confirmPassword = "Please confirm password";
      else if (userForm.password !== userForm.confirmPassword) errs.confirmPassword = "Passwords do not match";
    }
    if (!userForm.roleID) errs.roleID = "Role is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (validatePersonStep()) {
      setStep(1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(0);
  };

  const handleSubmit = () => {
    if (validateUserStep()) {
      const payload = {
        person: {
          FirstName: personForm.firstName.trim(),
          LastName: personForm.lastName.trim(),
          NationalNumber: personForm.nationalNumber.trim(),
          Phone: personForm.phone.trim(),
          Email: personForm.email.trim(),
          Address: personForm.address.trim(),
          City: personForm.city.trim(),
          Gender: personForm.gender,
        },
        user: {
          Username: userForm.username.trim(),
          Password: userForm.password,
          RoleID: parseInt(userForm.roleID),
        },
      };
      onSubmit(payload);
      resetAndClose();
    }
  };

  const handlePersonChange = (field, value) => {
    setPersonForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleUserChange = (field, value) => {
    setUserForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!isOpen) return null;

  // ── Input component ─────────────────────────────────────────────────────
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
              <MdPersonAdd className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isEdit ? "Edit User" : "Add New User"}
              </h2>
              <p className="text-xs text-gray-500">
                {isEdit ? "Update user account information" : "Create a person and user account in 2 steps"}
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

        {/* ── Step Indicator ──────────────────────────────────────────────── */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === step;
              const isCompleted = i < step;
              return (
                <div key={s.key} className="flex flex-1 items-center gap-2">
                  <div
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-50 text-gray-400 ring-1 ring-gray-200"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isActive
                          ? "bg-green-200 text-green-700"
                          : isCompleted
                          ? "bg-green-400 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {isCompleted ? <HiOutlineCheck className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 rounded-full transition-all ${
                        isCompleted ? "bg-green-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Form Content ────────────────────────────────────────────────── */}
        <div className="px-6 py-5">
          {/* Step 1: Person Info */}
          {step === 0 && (
            <div className="space-y-5">
              <div className="rounded-lg bg-green-50/50 border border-green-100 px-4 py-3">
                <p className="text-xs font-medium text-green-700">
                  Step 1 — Fill in the personal information for the new user.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={personForm.firstName}
                  onChange={handlePersonChange}
                  placeholder="Enter first name"
                  error={errors.firstName}
                  icon={<HiOutlineUser className="h-4 w-4" />}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={personForm.lastName}
                  onChange={handlePersonChange}
                  placeholder="Enter last name"
                  error={errors.lastName}
                  icon={<HiOutlineUser className="h-4 w-4" />}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="National Number"
                  name="nationalNumber"
                  value={personForm.nationalNumber}
                  onChange={handlePersonChange}
                  placeholder="e.g. AB123456"
                  error={errors.nationalNumber}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  value={personForm.phone}
                  onChange={handlePersonChange}
                  placeholder="+212 6XX XXX XXX"
                  error={errors.phone}
                />
              </div>

              <InputField
                label="Email"
                name="email"
                value={personForm.email}
                onChange={handlePersonChange}
                placeholder="user@example.com"
                error={errors.email}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField
                  label="Address"
                  name="address"
                  value={personForm.address}
                  onChange={handlePersonChange}
                  placeholder="Street address"
                  error={errors.address}
                />
                <InputField
                  label="City"
                  name="city"
                  value={personForm.city}
                  onChange={handlePersonChange}
                  placeholder="City name"
                  error={errors.city}
                />
              </div>

              <SelectField
                label="Gender"
                name="gender"
                value={personForm.gender}
                onChange={handlePersonChange}
                options={GENDER_OPTIONS}
                placeholder="Select gender"
                error={errors.gender}
              />
            </div>
          )}

          {/* Step 2: User Account */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="rounded-lg bg-green-50/50 border border-green-100 px-4 py-3">
                <p className="text-xs font-medium text-green-700">
                  Step 2 — Set up the user account credentials and role.
                </p>
              </div>

              {/* Person summary */}
              <div className="rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Person Summary</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-700">
                  <span><span className="font-medium">Name:</span> {personForm.firstName} {personForm.lastName}</span>
                  <span><span className="font-medium">Email:</span> {personForm.email}</span>
                  <span><span className="font-medium">Phone:</span> {personForm.phone}</span>
                  <span><span className="font-medium">City:</span> {personForm.city}</span>
                </div>
              </div>

              <InputField
                label="Username"
                name="username"
                value={userForm.username}
                onChange={handleUserChange}
                placeholder="Choose a username"
                error={errors.username}
                icon={<HiOutlineUser className="h-4 w-4" />}
              />

              {!isEdit && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField
                    label="Password"
                    name="password"
                    value={userForm.password}
                    onChange={handleUserChange}
                    type="password"
                    placeholder="Min. 6 characters"
                    error={errors.password}
                    icon={<RiLockPasswordLine className="h-4 w-4" />}
                  />
                  <InputField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={userForm.confirmPassword}
                    onChange={handleUserChange}
                    type="password"
                    placeholder="Re-enter password"
                    error={errors.confirmPassword}
                    icon={<RiLockPasswordLine className="h-4 w-4" />}
                  />
                </div>
              )}

              <SelectField
                label="Role"
                name="roleID"
                value={userForm.roleID}
                onChange={handleUserChange}
                options={ROLES.map((r) => ({ value: String(r.id), label: r.name }))}
                placeholder="Select a role"
                error={errors.roleID}
                icon={<HiOutlineShieldCheck className="h-4 w-4" />}
              />
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          {step === 0 ? (
            <button
              onClick={resetAndClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <HiOutlineChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step ? "w-6 bg-green-500" : i < step ? "w-2 bg-green-300" : "w-2 bg-gray-200"
                }`}
              />
            ))}
          </div>

          {step === 0 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-600"
            >
              Next
              <HiOutlineChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-600"
            >
              <HiOutlineCheck className="h-4 w-4" />
              {isEdit ? "Update User" : "Create User"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
