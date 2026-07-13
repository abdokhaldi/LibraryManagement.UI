import { useState, useEffect, useMemo } from "react";
import SearchBar from "../../../commonCards/SearchBar";
import AddRecordButton from "../../../commonCards/AddRecordButton";
import { filterMembers, getUniqueMemberCities, sortMembers, SORT_DIR, nextDirection } from "../../utils/memberHelpers.js";

export function MemberFilters({
  members,
  searchQuery,
  setSearchQuery,
  sortConfig,
  setSortConfig,
  currentPage,
  setCurrentPage,
  onFilterToggle,
  showFilters,
}) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedMembershipType, setSelectedMembershipType] = useState("");

  const cities = useMemo(() => getUniqueMemberCities(members), [members]);
  const membershipTypes = useMemo(() => 
    [...new Set(members.map(m => m.membershipType).filter(Boolean))].sort(), 
    [members]
  );

  const filteredMembers = useMemo(() => {
    let result = filterMembers(members, searchQuery);
    
    if (selectedCity) {
      result = result.filter(m => m.person?.city === selectedCity);
    }
    
    if (selectedStatus) {
      result = result.filter(m => m.isActive === (selectedStatus === "active"));
    }
    
    if (selectedMembershipType) {
      result = result.filter(m => m.membershipType === selectedMembershipType);
    }
    
    return sortMembers(result, sortConfig.key, sortConfig.direction);
  }, [members, searchQuery, selectedCity, selectedStatus, selectedMembershipType, sortConfig]);

  const hasActiveFilters = searchQuery !== "" || selectedCity !== "" || selectedStatus !== "" || selectedMembershipType !== "";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCity("");
    setSelectedStatus("");
    setSelectedMembershipType("");
    setSortConfig({ key: "fullName", direction: SORT_DIR.ASC });
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: nextDirection(prev.direction) };
      }
      return { key, direction: SORT_DIR.ASC };
    });
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-4 rounded-t-lg shadow-sm">
      <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
        <SearchBar
          placeholder="Search members…"
          searchTerm={searchQuery}
          setSearchTerm={handleSearch}
          onFilterClick={onFilterToggle}
          isFilterActive={showFilters}
        />
        
        <AddRecordButton label="Add New Member" />
      </div>

      {showFilters && (
        <div className="px-5 pb-5 flex flex-wrap gap-4 w-full border-t border-slate-100 bg-white">
          <div className="flex-1 min-w-[200px] mt-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-[150px] mt-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex-1 min-w-[200px] mt-4">
            <label className="block text-xs font-medium text-gray-500 mb-1">Membership Type</label>
            <select
              value={selectedMembershipType}
              onChange={(e) => setSelectedMembershipType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">All Types</option>
              {membershipTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-end mt-4">
              <button
                onClick={handleResetFilters}
                className="text-xs font-medium text-green-600 hover:text-green-700 transition"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {filteredMembers.length > 0 && (
        <div className="mt-4 flex items-center gap-3 border-t border-green-100 bg-green-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
          <span className="text-xs font-medium text-green-700">
            Showing {filteredMembers.length} of {members.length} members
          </span>
        </div>
      )}
      
      {filteredMembers.length === 0 && members.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 text-center">No members match your current filters.</p>
        </div>
      )}
    </div>
  );
}