import { useState, useMemo } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import SearchBar from "../../../commonCards/SearchBar";

const ASSOCIATION_OPTIONS = [
  { value: "all", label: "All" },
  { value: "user", label: "Users" },
  { value: "member", label: "Members" },
  { value: "none", label: "None" },
];

const GENDER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export function PeopleFilters({
  searchQuery,
  onSearchChange,
  associationFilter,
  onAssociationChange,
  genderFilter,
  onGenderChange,
  cityFilter,
  onCityChange,
  cities,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onResetFilters,
}) {
  const [expandedFilters, setExpandedFilters] = useState({
    association: false,
    gender: false,
    city: false,
  });

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const FilterButtonGroup = ({ options, selectedValue, onChange, label, expanded, onToggle }) => (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-500">{label}:</span>
      <div className="flex rounded-lg border border-gray-200 p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={(e) => {
              e.stopPropagation();
              onChange(opt.value);
            }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              selectedValue === opt.value
                ? "bg-green-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-t-lg shadow-sm">
      <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
        <SearchBar
          placeholder="Search by name, email, national number, phone, city, address…"
          searchTerm={searchQuery}
          setSearchTerm={(val) => onSearchChange(val)}
          onFilterClick={onToggleFilters}
          isFilterActive={showFilters}
        />
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 animate-in fade-in">
          <FilterButtonGroup
            options={ASSOCIATION_OPTIONS}
            selectedValue={associationFilter}
            onChange={onAssociationChange}
            label="Association"
          />

          <FilterButtonGroup
            options={GENDER_OPTIONS}
            selectedValue={genderFilter}
            onChange={onGenderChange}
            label="Gender"
          />

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">City:</span>
            <div className="flex rounded-lg border border-gray-200 p-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCityChange("all");
                }}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  cityFilter === "all"
                    ? "bg-green-500 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}>
                All
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCityChange(city);
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    cityFilter === city
                      ? "bg-green-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}>
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}