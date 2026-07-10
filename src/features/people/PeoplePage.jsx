import { useState, useCallback, useMemo } from "react";
import Pagination from '../Pagination/Pagination';
import StatCard from '../commonCards/StatCard';
import {
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineX,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineDotsVertical,
  HiOutlineLocationMarker,
  HiOutlineIdentification,
} from "react-icons/hi";
import {
  MdPeopleAlt,
  MdPersonOff,
  MdBadge,
} from "react-icons/md";
import { RiUserAddLine, RiGroupLine } from "react-icons/ri";
import { FaUserTag, FaIdCard, FaVenusMars } from "react-icons/fa";
import SearchBar from '../commonCards/SearchBar';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_PEOPLE = [
  {
    personID: 1,
    firstName: "Ahmed",
    lastName: "Benali",
    nationalNumber: "AB123456",
    phone: "+212 6 12 34 56 78",
    email: "ahmed.benali@example.com",
    address: "123 Avenue Mohammed V",
    city: "Casablanca",
    gender: "Male",
    association: "user",
    associationDetails: { type: "Admin", username: "ahmed.b" },
  },
  {
    personID: 2,
    firstName: "Fatima",
    lastName: "Zahra",
    nationalNumber: "FZ789012",
    phone: "+212 6 98 76 54 32",
    email: "fatima.zahra@example.com",
    address: "45 Rue de la Liberté",
    city: "Rabat",
    gender: "Female",
    association: "member",
    associationDetails: { type: "Student", membershipDate: "2025-09-15" },
  },
  {
    personID: 3,
    firstName: "Youssef",
    lastName: "El Amrani",
    nationalNumber: "YE345678",
    phone: "+212 6 55 44 33 22",
    email: "youssef.amrani@example.com",
    address: "78 Boulevard Hassan II",
    city: "Marrakech",
    gender: "Male",
    association: "user",
    associationDetails: { type: "Librarian", username: "youssef.e" },
  },
  {
    personID: 4,
    firstName: "Amina",
    lastName: "Tazi",
    nationalNumber: "AT901234",
    phone: "+212 6 11 22 33 44",
    email: "amina.tazi@example.com",
    address: "12 Rue Oued El Makhazine",
    city: "Fes",
    gender: "Female",
    association: "none",
    associationDetails: null,
  },
  {
    personID: 5,
    firstName: "Karim",
    lastName: "Idrissi",
    nationalNumber: "KI567890",
    phone: "+212 6 77 88 99 00",
    email: "karim.idrissi@example.com",
    address: "56 Avenue des FAR",
    city: "Tangier",
    gender: "Male",
    association: "member",
    associationDetails: { type: "Faculty", membershipDate: "2024-03-10" },
  },
  {
    personID: 6,
    firstName: "Nadia",
    lastName: "Bennani",
    nationalNumber: "NB123789",
    phone: "+212 6 44 55 66 77",
    email: "nadia.bennani@example.com",
    address: "34 Rue Allal Ben Abdellah",
    city: "Agadir",
    gender: "Female",
    association: "user",
    associationDetails: { type: "Staff", username: "nadia.b" },
  },
  {
    personID: 7,
    firstName: "Hassan",
    lastName: "Ouazzani",
    nationalNumber: "HO456123",
    phone: "+212 6 33 22 11 00",
    email: "hassan.ouazzani@example.com",
    address: "89 Boulevard Mohammed VI",
    city: "Oujda",
    gender: "Male",
    association: "none",
    associationDetails: null,
  },
  {
    personID: 8,
    firstName: "Samira",
    lastName: "El Fassi",
    nationalNumber: "SF789456",
    phone: "+212 6 66 77 88 99",
    email: "samira.elfassi@example.com",
    address: "23 Rue de la Plage",
    city: "El Jadida",
    gender: "Female",
    association: "member",
    associationDetails: { type: "Staff", membershipDate: "2025-01-20" },
  },
  {
    personID: 9,
    firstName: "Omar",
    lastName: "Bouazza",
    nationalNumber: "OB321654",
    phone: "+212 6 99 88 77 66",
    email: "omar.bouazza@example.com",
    address: "67 Avenue de l'Université",
    city: "Meknes",
    gender: "Male",
    association: "user",
    associationDetails: { type: "Admin", username: "omar.b" },
  },
  {
    personID: 10,
    firstName: "Leila",
    lastName: "Chraibi",
    nationalNumber: "LC654987",
    phone: "+212 6 22 33 44 55",
    email: "leila.chraibi@example.com",
    address: "15 Rue Atlas",
    city: "Kenitra",
    gender: "Female",
    association: "none",
    associationDetails: null,
  },
  {
    personID: 11,
    firstName: "Rachid",
    lastName: "Mansouri",
    nationalNumber: "RM147258",
    phone: "+212 6 88 77 66 55",
    email: "rachid.mansouri@example.com",
    address: "90 Boulevard Zerktouni",
    city: "Casablanca",
    gender: "Male",
    association: "member",
    associationDetails: { type: "Student", membershipDate: "2025-06-01" },
  },
  {
    personID: 12,
    firstName: "Mouna",
    lastName: "Hassani",
    nationalNumber: "MH369258",
    phone: "+212 6 55 66 77 88",
    email: "mouna.hassani@example.com",
    address: "44 Rue Moulay Ismail",
    city: "Rabat",
    gender: "Female",
    association: "user",
    associationDetails: { type: "Librarian", username: "mouna.h" },
  },
  {
    personID: 13,
    firstName: "Driss",
    lastName: "Kabbaj",
    nationalNumber: "DK852963",
    phone: "+212 6 44 33 22 11",
    email: "driss.kabbaj@example.com",
    address: "71 Avenue Hassan II",
    city: "Safi",
    gender: "Male",
    association: "none",
    associationDetails: null,
  },
  {
    personID: 14,
    firstName: "Sanaa",
    lastName: "Boukhari",
    nationalNumber: "SB741852",
    phone: "+212 6 77 88 99 00",
    email: "sanaa.boukhari@example.com",
    address: "33 Rue Mohammed VI",
    city: "Tetouan",
    gender: "Female",
    association: "member",
    associationDetails: { type: "Faculty", membershipDate: "2024-11-05" },
  },
  {
    personID: 15,
    firstName: "Tarik",
    lastName: "El Ghazi",
    nationalNumber: "TG951357",
    phone: "+212 6 11 22 33 44",
    email: "tarik.elghazi@example.com",
    address: "28 Rue de la Gare",
    city: "Beni Mellal",
    gender: "Male",
    association: "user",
    associationDetails: { type: "Staff", username: "tarik.g" },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(firstName, lastName) {
  if (!firstName && !lastName) return "?";
  return ((firstName?.[0] || "") + (lastName?.[0] || "")).toUpperCase();
}

const AVATAR_COLORS = [
  "bg-green-100 text-green-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-lime-100 text-lime-700",
  "bg-cyan-100 text-cyan-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-orange-100 text-orange-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-indigo-100 text-indigo-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

function getAvatarColor(id) {
  if (!id) return AVATAR_COLORS[0];
  const hash = id.toString().split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

// ─── Sort helpers ────────────────────────────────────────────────────────────
const SORT_DIR = { ASC: "asc", DESC: "desc", NONE: "none" };

function nextDirection(current) {
  if (current === SORT_DIR.NONE) return SORT_DIR.ASC;
  if (current === SORT_DIR.ASC) return SORT_DIR.DESC;
  return SORT_DIR.NONE;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SortIcon({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) {
    return <span className="ml-1 text-gray-300">⇅</span>;
  }
  if (sortConfig.direction === SORT_DIR.ASC) {
    return <HiOutlineChevronUp className="ml-1 h-3.5 w-3.5 text-green-500" />;
  }
  if (sortConfig.direction === SORT_DIR.DESC) {
    return <HiOutlineChevronDown className="ml-1 h-3.5 w-3.5 text-green-500" />;
  }
  return <span className="ml-1 text-gray-300">⇅</span>;
}

function AssociationBadge({ association, details }) {
  if (association === "user") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
        <HiOutlineUser className="h-3 w-3" />
        User
        {details?.type && <span className="ml-1 px-1.5 py-0.5 bg-blue-100 rounded text-[10px] font-semibold">{details.type}</span>}
      </span>
    );
  }
  if (association === "member") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-600/20">
        <RiGroupLine className="h-3 w-3" />
        Member
        {details?.type && <span className="ml-1 px-1.5 py-0.5 bg-purple-100 rounded text-[10px] font-semibold">{details.type}</span>}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-500/20">
      <MdPersonOff className="h-3 w-3" />
      None
    </span>
  );
}

function GenderBadge({ gender }) {
  if (gender === "Male") {
    return (
      <span className="inline-flex items-center gap-1 rounded-sm bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
        <FaVenusMars className="h-3 w-3" />
        Male
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-600/20">
      <FaVenusMars className="h-3 w-3" />
      Female
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PeoplePage() {
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [associationFilter, setAssociationFilter] = useState("all"); // "all", "user", "member", "none"
  const [genderFilter, setGenderFilter] = useState("all"); // "all", "Male", "Female"
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
    const users = MOCK_PEOPLE.filter(p => p.association === "user").length;
    const members = MOCK_PEOPLE.filter(p => p.association === "member").length;
    const none = MOCK_PEOPLE.filter(p => p.association === "none").length;
    const males = MOCK_PEOPLE.filter(p => p.gender === "Male").length;
    const females = MOCK_PEOPLE.filter(p => p.gender === "Female").length;
    
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
    return [...new Set(MOCK_PEOPLE.map(p => p.city))].sort();
  }, []);

  // ── Filtered & Sorted People ────────────────────────────────────────────
  const filteredPeople = useMemo(() => {
    let result = [...MOCK_PEOPLE].filter(p => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = `${p.firstName} ${p.lastName}`.toLowerCase().includes(query);
        const matchesEmail = p.email?.toLowerCase().includes(query);
        const matchesNational = p.nationalNumber?.toLowerCase().includes(query);
        const matchesPhone = p.phone?.toLowerCase().includes(query);
        const matchesCity = p.city?.toLowerCase().includes(query);
        const matchesAddress = p.address?.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesNational && !matchesPhone && !matchesCity && !matchesAddress) {
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
  const pageSizeLocal = 10;
  const totalPages = Math.ceil(filteredPeople.length / pageSizeLocal) || 1;
  const paginatedPeople = useMemo(() => {
    const start = (currentPage - 1) * pageSizeLocal;
    return filteredPeople.slice(start, start + pageSizeLocal);
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
      setSelectedPeople(new Set(paginatedPeople.map(p => p.personID)));
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

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedPeople(new Set());
    }
  }, [totalPages]);

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
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">People Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Independent person entity management — view and manage all persons with their system associations.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <HiOutlineCalendar className="h-4 w-4" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-medium text-sm gap-2"
            >
              <RiUserAddLine className="h-4 w-4" />
              Add Person
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 mb-6">
          <StatCard
            label="Total People"
            value={stats.total}
            icon={<MdPeopleAlt className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            label="Users"
            value={stats.users}
            icon={<HiOutlineUser className="h-5 w-5" />}
            color="blue"
          />
          <StatCard
            label="Members"
            value={stats.members}
            icon={<RiGroupLine className="h-5 w-5" />}
            color="purple"
          />
          <StatCard
            label="No Association"
            value={stats.none}
            icon={<MdPersonOff className="h-5 w-5" />}
            color="gray"
          />
          <StatCard
            label="Male"
            value={stats.males}
            icon={<FaVenusMars className="h-5 w-5" />}
            color="blue"
          />
          <StatCard
            label="Female"
            value={stats.females}
            icon={<FaVenusMars className="h-5 w-5" />}
            color="pink"
          />
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-t-lg shadow-sm">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
            <SearchBar
              placeholder="Search by name, email, national number, phone, city, address…"
              searchTerm={searchQuery}
              setSearchTerm={(val) => { setSearchQuery(val); setCurrentPage(1); }}
              onFilterClick={() => setShowFilters(!showFilters)}
              isFilterActive={showFilters}
            />
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 animate-in fade-in">
              {/* Association filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Association:</span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "user", label: "Users" },
                    { value: "member", label: "Members" },
                    { value: "none", label: "None" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setAssociationFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        associationFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">Gender:</span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGenderFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        genderFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">City:</span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCityFilter("all");
                      setCurrentPage(1);
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
                        setCityFilter(city);
                        setCurrentPage(1);
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

          {/* Bulk Actions */}
          {selectedPeople.size > 0 && (
            <div className="mt-4 flex items-center gap-3 border-t border-green-100 bg-green-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
              <span className="text-xs font-medium text-green-700">
                {selectedPeople.size} selected
              </span>
              <button
                onClick={() => setSelectedPeople(new Set())}
                className="ml-auto text-xs text-gray-500 hover:text-gray-700 transition"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>

        {/* People Table */}
        <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="w-12 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={
                        paginatedPeople.length > 0 &&
                        selectedPeople.size === paginatedPeople.length
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                    />
                  </th>
                  {[
                    { key: "firstName", label: "First Name" },
                    { key: "lastName", label: "Last Name" },
                    { key: "nationalNumber", label: "National ID" },
                    { key: "phone", label: "Phone" },
                    { key: "email", label: "Email" },
                    { key: "address", label: "Address" },
                    { key: "city", label: "City" },
                    { key: "gender", label: "Gender" },
                    { key: "association", label: "Association" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="cursor-pointer select-none px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon columnKey={col.key} sortConfig={sortConfig} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedPeople.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <MdPeopleAlt className="h-10 w-10 text-gray-300" />
                        <p className="text-sm font-medium text-gray-500">No people found</p>
                        <p className="text-xs text-gray-400">
                          Try adjusting your search or filter criteria
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={handleResetFilters}
                            className="mt-2 text-xs font-medium text-green-600 hover:text-green-700 transition"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedPeople.map((person) => (
                    <tr
                      key={person.personID}
                      className={`group transition ${
                        selectedPeople.has(person.personID)
                          ? "bg-green-50/60"
                          : "hover:bg-gray-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedPeople.has(person.personID)}
                          onChange={() => handleSelect(person.personID)}
                          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                        />
                      </td>

                      {/* First Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(person.personID)}`}>
                            {getInitials(person.firstName, person.lastName)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {person.firstName}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Last Name */}
                      <td className="px-4 py-3.5 text-sm text-gray-900">
                        {person.lastName}
                      </td>

                      {/* National Number */}
                      <td className="px-4 py-3.5 text-sm text-gray-700 font-mono">
                        <span className="flex items-center gap-1.5">
                          <FaIdCard className="h-3.5 w-3.5 text-gray-400" />
                          {person.nationalNumber}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3.5 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <HiOutlinePhone className="h-3.5 w-3.5 text-gray-400" />
                          {person.phone}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3.5 text-sm text-gray-500 truncate max-w-xs">
                        <span className="flex items-center gap-1.5">
                          <HiOutlineMail className="h-3.5 w-3.5 text-gray-400" />
                          {person.email}
                        </span>
                      </td>

                      {/* Address */}
                      <td className="px-4 py-3.5 text-sm text-gray-500 truncate max-w-xs">
                        <span className="flex items-center gap-1.5">
                          <HiOutlineLocationMarker className="h-3.5 w-3.5 text-gray-400" />
                          {person.address}
                        </span>
                      </td>

                      {/* City */}
                      <td className="px-4 py-3.5 text-sm text-gray-500">
                        {person.city}
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-3.5">
                        <GenderBadge gender={person.gender} />
                      </td>

                      {/* Association */}
                      <td className="px-4 py-3.5">
                        <AssociationBadge association={person.association} details={person.associationDetails} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Details */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDetailModal(person);
                              setActionMenuOpen(null);
                            }}
                            title="View details"
                            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-600 focus:opacity-100"
                          >
                            <HiOutlineEye className="h-4 w-4" />
                          </button>

                          {/* Action Menu */}
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActionMenuOpen(
                                  actionMenuOpen === person.personID ? null : person.personID
                                );
                              }}
                              className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 focus:opacity-100"
                            >
                              <HiOutlineDotsVertical className="h-4 w-4" />
                            </button>

                            {actionMenuOpen === person.personID && (
                              <div className="absolute right-0 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-10 animate-in fade-in zoom-in-95">
                                <button
                                  onClick={() => {
                                    setDetailModal(person);
                                    setActionMenuOpen(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  View Details
                                </button>
                                <hr className="my-1 border-gray-100" />
                                <button
                                  onClick={() => {
                                    // Edit person - placeholder
                                    setActionMenuOpen(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  Edit Person
                                </button>
                                <button
                                  onClick={() => {
                                    // Delete person - placeholder
                                    setActionMenuOpen(null);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
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
      </div>

      {/* Person Detail Modal */}
      {detailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={() => setDetailModal(null)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl p-6 shadow-xl bg-white max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold ${getAvatarColor(detailModal.personID)}`}>
                  {getInitials(detailModal.firstName, detailModal.lastName)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {detailModal.firstName} {detailModal.lastName}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <AssociationBadge association={detailModal.association} details={detailModal.associationDetails} />
                    <GenderBadge gender={detailModal.gender} />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDetailModal(null)}
                className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {/* Personal Information Section */}
              <div className="border-t pt-5">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-gray-500 mb-4">Personal Information</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlineIdentification className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">National Number</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">{detailModal.nationalNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlineCalendar className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="text-sm font-medium text-gray-900">{detailModal.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlinePhone className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{detailModal.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlineMail className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{detailModal.email}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlineLocationMarker className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{detailModal.address}, {detailModal.city}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Association Details Section */}
              {detailModal.association !== "none" && detailModal.associationDetails && (
                <div className="border-t pt-5">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-gray-500 mb-4">
                    {detailModal.association === "user" ? "User Account Details" : "Membership Details"}
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400"><FaUserTag className="h-4 w-4" /></span>
                      <div>
                        <p className="text-xs text-gray-500">Type / Role</p>
                        <p className="text-sm font-medium text-gray-900">{detailModal.associationDetails.type}</p>
                      </div>
                    </div>
                    {detailModal.association === "user" && detailModal.associationDetails.username && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400"><HiOutlineUser className="h-4 w-4" /></span>
                        <div>
                          <p className="text-xs text-gray-500">Username</p>
                          <p className="text-sm font-medium text-gray-900">@{detailModal.associationDetails.username}</p>
                        </div>
                      </div>
                    )}
                    {detailModal.association === "member" && detailModal.associationDetails.membershipDate && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400"><HiOutlineCalendar className="h-4 w-4" /></span>
                        <div>
                          <p className="text-xs text-gray-500">Member Since</p>
                          <p className="text-sm font-medium text-gray-900">{detailModal.associationDetails.membershipDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* No Association Message */}
              {detailModal.association === "none" && (
                <div className="border-t pt-5">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <MdBadge className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">No System Association</p>
                      <p className="text-xs text-gray-500">This person is not linked to any user account or library membership.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDetailModal(null)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setDetailModal(null);
                  // Edit action
                }}
                className="flex-1 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-400"
              >
                Edit Person
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}