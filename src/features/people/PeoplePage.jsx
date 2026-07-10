import { useState, useCallback, useMemo } from "react";
import Pagination from "../Pagination/Pagination";
import { MOCK_PEOPLE } from "./constants";
import { getAvatarColor, getInitials, nextDirection, SORT_DIR } from "./utils/helpers";
import {
  PeopleHeader,
  PeopleStats,
  PeopleFilters,
  PeopleTable,
  PeopleTableHeader,
  PeopleTableBody,
  PersonDetailModal,
} from "./components";

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

  // ── Derived data / Stats ────────────────────────────────────────────────
  const stats = useMemo(() => {
    const users = MOCK_PEOPLE.filter((p) => p.association === "user").length;
    const members = MOCK_PEOPLE.filter((p) => p.association === "member").length;
    const none = MOCK_PEOPLE.filter((p) => p.association === "none").length;
    const males = MOCK_PEOPLE.filter((p) => p.gender === "Male").length;
    const females = MOCK_PEOPLE.filter((p) => p.gender === "Female").length;

    return {
      total: MOCK_PEOPLE.length,
      users,
      members,
      none,
      males,
      females,
    };
  }, []);

  // ── Unique cities for filter ────────────────────────────────────────────
  const cities = useMemo(() => {
    return [...new Set(MOCK_PEOPLE.map((p) => p.city))].sort();
  }, []);

  // ── Filtered & Sorted People ────────────────────────────────────────────
  const filteredPeople = useMemo(() => {
    let result = [...MOCK_PEOPLE].filter((p) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = `${p.firstName} ${p.lastName}`.toLowerCase().includes(query);
        const matchesEmail = p.email?.toLowerCase().includes(query);
        const matchesNational = p.nationalNumber?.toLowerCase().includes(query);
        const matchesPhone = p.phone?.toLowerCase().includes(query);
        const matchesCity = p.city?.toLowerCase().includes(query);
        const matchesAddress = p.address?.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesEmail &&
          !matchesNational &&
          !matchesPhone &&
          !matchesCity &&
          !matchesAddress
        ) {
          return false;
        }
      }

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

    // Sort
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (aVal === null || aVal === undefined) aVal = "";
      if (bVal === null || bVal === undefined) bVal = "";

      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortConfig.direction === SORT_DIR.ASC ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === SORT_DIR.ASC ? 1 : -1;
      return 0;
    });

    return result;
  }, [searchQuery, associationFilter, genderFilter, cityFilter, sortConfig]);

  // ── Pagination ───────────────────────────────────────────────────────────
  const pageSize = 10;
  const totalPages = Math.ceil(filteredPeople.length / pageSize) || 1;
  const paginatedPeople = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPeople.slice(start, start + pageSize);
  }, [filteredPeople, currentPage]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: nextDirection(prev.direction) };
      }
      return { key, direction: SORT_DIR.ASC };
    });
    setCurrentPage(1);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedPeople.size === paginatedPeople.length) {
      setSelectedPeople(new Set());
    } else {
      setSelectedPeople(new Set(paginatedPeople.map((p) => p.personID)));
    }
  }, [paginatedPeople, selectedPeople]);

  const handleSelect = useCallback((id) => {
    setSelectedPeople((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setSelectedPeople(new Set());
      }
    },
    [totalPages]
  );

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setAssociationFilter("all");
    setGenderFilter("all");
    setCityFilter("all");
    setSortConfig({ key: "firstName", direction: SORT_DIR.ASC });
    setCurrentPage(1);
  }, []);

  const hasActiveFilters =
    searchQuery !== "" ||
    associationFilter !== "all" ||
    genderFilter !== "all" ||
    cityFilter !== "all";

  const handleTableClick = useCallback(() => {
    setActionMenuOpen(null);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-100 min-h-screen" onClick={handleTableClick}>
      {/* Header */}
      <PeopleHeader
        currentDate={new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        onAddPerson={() => {}}
      />

      {/* Stats Cards */}
      <PeopleStats stats={stats} />

      {/* Filters & Toolbar */}
      <PeopleFilters
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        associationFilter={associationFilter}
        onAssociationChange={(val) => {
          setAssociationFilter(val);
          setCurrentPage(1);
        }}
        genderFilter={genderFilter}
        onGenderChange={(val) => {
          setGenderFilter(val);
          setCurrentPage(1);
        }}
        cityFilter={cityFilter}
        onCityChange={(val) => {
          setCityFilter(val);
          setCurrentPage(1);
        }}
        cities={cities}
        showFilters={showFilters}
        onToggleFilters={setShowFilters}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

      {/* People Table */}
      <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <PeopleTableHeader
              onSort={handleSort}
              sortConfig={sortConfig}
              selectedCount={selectedPeople.size}
              totalCount={paginatedPeople.length}
              onSelectAll={handleSelectAll}
            />
            <PeopleTableBody
              people={paginatedPeople}
              selectedPeople={selectedPeople}
              onSelect={handleSelect}
              onViewDetails={setDetailModal}
              onActionMenuToggle={setActionMenuOpen}
              actionMenuOpen={actionMenuOpen}
              onEditPerson={() => {}}
              onDeletePerson={() => {}}
              onRowClick={handleTableClick}
            />
          </table>
        </div>

        {/* Pagination */}
        {paginatedPeople.length > 0 && (
          <Pagination
            onNext={() => handlePageChange(currentPage + 1)}
            onPrev={() => handlePageChange(currentPage - 1)}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        )}
      </div>

      {/* Person Detail Modal */}
      <PersonDetailModal
        person={detailModal}
        isOpen={!!detailModal}
        onClose={() => setDetailModal(null)}
        onEdit={() => {}}
      />
    </div>
  );
}