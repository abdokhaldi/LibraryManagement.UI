import { useState, useCallback, useMemo, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import { getAvatarColor, getInitials, nextDirection, SORT_DIR } from "./utils/helpers";
import {
  PeopleHeader,
  PeopleStats,
  PeopleFilters,
  PeopleTable,
  PeopleTableHeader,
  PeopleTableBody,
  PersonDetailModal,
  PersonFormModal,
} from "./components";
import {
  fetchPeople,
  getPersonDetails,
  createPerson,
  updatePerson,
  activatePerson,
  deactivatePerson,
  checkPersonExistence,
} from "../../services/personService";

import { SubHeader } from "../commonCards/SubHeader";

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

const TABLE_COLUMNS = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "nationalNumber", label: "National ID" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "gender", label: "Gender" },
  { key: "association", label: "Association" },
];

export default function PeoplePage() {
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [associationFilter, setAssociationFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "firstName",
    direction: SORT_DIR.ASC,
  });
  const [selectedPeople, setSelectedPeople] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [detailModal, setDetailModal] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  
  // API State
  const [people, setPeople] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    users: 0,
    members: 0,
    none: 0,
    males: 0,
    females: 0,
  });

  // Fetch people from API
  const fetchPeopleData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Build orderBy string for API
      const orderBy = sortConfig.key && sortConfig.direction !== SORT_DIR.NONE 
        ? `${sortConfig.key}_${sortConfig.direction}` 
        : '';
      
      // Build search term - API handles search across multiple fields
      const searchTerm = searchQuery.trim();
      
      // Build filter parameters - we'll pass them as part of search or handle client-side for complex filters
      // For now, we'll use the API's search and do association/gender/city filtering client-side
      // since the API might not support all these filters
      const result = await fetchPeople({
        pageNumber: currentPage,
        pageSize: 10,
        searchTerm,
        orderBy,
      });
      
      setPeople(result.data || []);
      setTotalPages(result.totalPages || 1);
      setTotalCount((result.data || []).length); // We don't have total count from API, using page data length
      
      // Extract unique cities from fetched data
      const uniqueCities = [...new Set((result.data || []).map(p => p.city))].filter(Boolean).sort();
      setCities(uniqueCities);
      
      // Calculate stats from current page data (or we could fetch all for stats)
      const data = result.data || [];
      setStats({
        total: data.length,
        users: data.filter(p => p.association === "user").length,
        members: data.filter(p => p.association === "member").length,
        none: data.filter(p => p.association === "none").length,
        males: data.filter(p => p.gender === "Male").length,
        females: data.filter(p => p.gender === "Female").length,
      });
      
    } catch (err) {
      console.error('Error fetching people:', err);
      setError(err.message || 'Failed to fetch people');
      setPeople([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, sortConfig]);

  // Load initial data
  useEffect(() => {
    fetchPeopleData();
  }, [fetchPeopleData]);

  // Handle sort
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: nextDirection(prev.direction) };
      }
      return { key, direction: SORT_DIR.ASC };
    });
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedPeople(new Set());
    }
  }, [totalPages]);

  // Handle search change
  const handleSearchChange = useCallback((val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  }, []);

  // Handle filter changes
  const handleAssociationChange = useCallback((val) => {
    setAssociationFilter(val);
    setCurrentPage(1);
  }, []);

  const handleGenderChange = useCallback((val) => {
    setGenderFilter(val);
    setCurrentPage(1);
  }, []);

  const handleCityChange = useCallback((val) => {
    setCityFilter(val);
    setCurrentPage(1);
  }, []);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setAssociationFilter("all");
    setGenderFilter("all");
    setCityFilter("all");
    setSortConfig({ key: "firstName", direction: SORT_DIR.ASC });
    setCurrentPage(1);
  }, []);

  // Client-side filtering for association, gender, city (since API may not support these)
  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      // Association filter
      if (associationFilter !== "all" && p.association !== associationFilter) {
        return false;
      }
      // Gender filter
      if (genderFilter !== "all" && p.gender !== genderFilter) {
        return false;
      }
      // City filter
      if (cityFilter !== "all" && p.city !== cityFilter) {
        return false;
      }
      return true;
    });
  }, [people, associationFilter, genderFilter, cityFilter]);

  // Handle selection
  const handleSelectAll = useCallback(() => {
    if (selectedPeople.size === filteredPeople.length) {
      setSelectedPeople(new Set());
    } else {
      setSelectedPeople(new Set(filteredPeople.map((p) => p.personID)));
    }
  }, [filteredPeople, selectedPeople]);

  const handleSelect = useCallback((id) => {
    setSelectedPeople((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Handle view details - fetch full person details from API
  const handleViewDetails = useCallback(async (person) => {
    try {
      setIsLoading(true);
      const result = await getPersonDetails(person.personID);
      if (result.success) {
        setDetailModal(result.data);
      } else {
        setError(result.errorMessage || 'Failed to load person details');
      }
    } catch (err) {
      console.error('Error fetching person details:', err);
      setError(err.message || 'Failed to load person details');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle form submit (create/update)
  const handleSubmitPerson = useCallback(async (personData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let result;
      if (editingPerson) {
        // Update existing person
        result = await updatePerson(editingPerson.personID, personData);
      } else {
        // Create new person
        result = await createPerson(personData);
      }
      
      if (result.success) {
        // Refresh the list
        await fetchPeopleData();
        setShowFormModal(false);
        setEditingPerson(null);
      } else {
        setError(result.errorMessage || 'Failed to save person');
      }
    } catch (err) {
      console.error('Error saving person:', err);
      setError(err.message || 'Failed to save person');
    } finally {
      setIsLoading(false);
    }
  }, [editingPerson, fetchPeopleData]);

  // Handle activate/deactivate
  const handleToggleActive = useCallback(async (personId, isActive) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = isActive 
        ? await deactivatePerson(personId)
        : await activatePerson(personId);
      
      if (result.success) {
        await fetchPeopleData();
        // Close action menu
        setActionMenuOpen(null);
      } else {
        setError(result.errorMessage || `Failed to ${isActive ? 'deactivate' : 'activate'} person`);
      }
    } catch (err) {
      console.error('Error toggling person status:', err);
      setError(err.message || `Failed to ${isActive ? 'deactivate' : 'activate'} person`);
    } finally {
      setIsLoading(false);
    }
  }, [fetchPeopleData]);

  // Handle delete (if API supports it, otherwise use deactivate)
  const handleDeletePerson = useCallback(async (personId) => {
    // Since there's no delete API, we'll deactivate instead
    await handleToggleActive(personId, true);
  }, [handleToggleActive]);

  const hasActiveFilters =
    searchQuery !== "" ||
    associationFilter !== "all" ||
    genderFilter !== "all" ||
    cityFilter !== "all";

  const handleTableClick = useCallback(() => {
    setActionMenuOpen(null);
  }, []);

  // Render loading skeleton or error state
  if (isLoading && people.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading people...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen" onClick={handleTableClick}>
      {/* Header */}
      
     < SubHeader />

      {/* Stats Cards */}
      <PeopleStats stats={stats} />

      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-2 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Filters & Toolbar */}
      
      <PeopleFilters
        onAddPerson={() => {
          setEditingPerson(null);
          setShowFormModal(true);}
        }
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        associationFilter={associationFilter}
        onAssociationChange={handleAssociationChange}
        genderFilter={genderFilter}
        onGenderChange={handleGenderChange}
        cityFilter={cityFilter}
        onCityChange={handleCityChange}
        cities={cities}
        showFilters={showFilters}
        onToggleFilters={setShowFilters}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

     
    
      {/* People Table */}
      <div className=" overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <PeopleTableHeader
              onSort={handleSort}
              sortConfig={sortConfig}
              selectedCount={selectedPeople.size}
              totalCount={filteredPeople.length}
              onSelectAll={handleSelectAll}
            />
            <PeopleTableBody
              people={filteredPeople}
              selectedPeople={selectedPeople}
              onSelect={handleSelect}
              onViewDetails={handleViewDetails}
              onActionMenuToggle={setActionMenuOpen}
              actionMenuOpen={actionMenuOpen}
              onEditPerson={(person) => {
                setEditingPerson(person);
                setShowFormModal(true);
              }}
              onDeletePerson={handleDeletePerson}
              onToggleActive={handleToggleActive}
              onRowClick={handleTableClick}
            />
          </table>
        </div>

        {/* Pagination */}
        {filteredPeople.length > 0 && (
          <Pagination
            onNext={() => handlePageChange(currentPage + 1)}
            onPrev={() => handlePageChange(currentPage - 1)}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
        
        {filteredPeople.length === 0 && !isLoading && (
          <div className="p-8 text-center text-gray-500">
            No people found matching your criteria.
          </div>
        )}
      </div>

      {/* Person Detail Modal */}
      <PersonDetailModal
        person={detailModal}
        isOpen={!!detailModal}
        onClose={() => setDetailModal(null)}
        onEdit={(person) => {
          setDetailModal(null);
          setEditingPerson(person);
          setShowFormModal(true);
        }}
      />

      {/* Person Form Modal (Add / Edit) */}
      <PersonFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingPerson(null);
        }}
        onSubmit={handleSubmitPerson}
        person={editingPerson}
        isLoading={isLoading}
      />
    </div>
  );
}