import { useState, useMemo, useCallback } from "react";
import StatCard from '../../features/commonCards/StatCard';
import Pagination from '../Pagination/Pagination';
import {
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineBan,
  HiOutlineEye,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineDotsVertical,
} from "react-icons/hi";
import { MdPeopleAlt, MdPersonOff } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import SearchBar from '../commonCards/SearchBar';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_MEMBERS = [
  {
    id: 1,
    fullName: "Amina Benali",
    email: "amina.benali@email.com",
    phone: "+212 6 12 34 56 78",
    membershipDate: "2024-01-15",
    status: "active",
    borrowedBooks: 3,
    totalBorrowed: 12,
    membershipType: "Regular",
  },
  {
    id: 2,
    fullName: "Youssef El Amrani",
    email: "youssef.elamrani@email.com",
    phone: "+212 6 22 33 44 55",
    membershipDate: "2024-02-20",
    status: "active",
    borrowedBooks: 1,
    totalBorrowed: 8,
    membershipType: "Premium",
  },
  {
    id: 3,
    fullName: "Fatima Zahra Chraibi",
    email: "fatima.chraibi@email.com",
    phone: "+212 6 55 66 77 88",
    membershipDate: "2023-11-05",
    status: "inactive",
    borrowedBooks: 0,
    totalBorrowed: 5,
    membershipType: "Regular",
  },
  {
    id: 4,
    fullName: "Mohammed Al-Fassi",
    email: "mohammed.alfassi@email.com",
    phone: "+212 6 99 88 77 66",
    membershipDate: "2024-03-10",
    status: "active",
    borrowedBooks: 2,
    totalBorrowed: 15,
    membershipType: "Premium",
  },
  {
    id: 5,
    fullName: "Khadija Tazi",
    email: "khadija.tazi@email.com",
    phone: "+212 6 11 22 33 44",
    membershipDate: "2023-06-22",
    status: "active",
    borrowedBooks: 0,
    totalBorrowed: 3,
    membershipType: "Regular",
  },
  {
    id: 6,
    fullName: "Omar Berrada",
    email: "omar.berrada@email.com",
    phone: "+212 6 44 55 66 77",
    membershipDate: "2024-05-18",
    status: "inactive",
    borrowedBooks: 0,
    totalBorrowed: 1,
    membershipType: "Regular",
  },
  {
    id: 7,
    fullName: "Salma Idrissi",
    email: "salma.idrissi@email.com",
    phone: "+212 6 77 88 99 00",
    membershipDate: "2024-04-02",
    status: "active",
    borrowedBooks: 4,
    totalBorrowed: 20,
    membershipType: "Premium",
  },
  {
    id: 8,
    fullName: "Rachid Ouazzani",
    email: "rachid.ouazzani@email.com",
    phone: "+212 6 33 22 11 00",
    membershipDate: "2023-09-14",
    status: "active",
    borrowedBooks: 1,
    totalBorrowed: 7,
    membershipType: "Regular",
  },
  {
    id: 9,
    fullName: "Nadia Bensouda",
    email: "nadia.bensouda@email.com",
    phone: "+212 6 66 55 44 33",
    membershipDate: "2024-06-01",
    status: "active",
    borrowedBooks: 2,
    totalBorrowed: 2,
    membershipType: "Regular",
  },
  {
    id: 10,
    fullName: "Hassan Lahlou",
    email: "hassan.lahlou@email.com",
    phone: "+212 6 88 77 66 55",
    membershipDate: "2023-12-30",
    status: "inactive",
    borrowedBooks: 0,
    totalBorrowed: 4,
    membershipType: "Regular",
  },
  {
    id: 11,
    fullName: "Zineb Belhaj",
    email: "zineb.belhaj@email.com",
    phone: "+212 6 00 11 22 33",
    membershipDate: "2024-07-08",
    status: "active",
    borrowedBooks: 1,
    totalBorrowed: 6,
    membershipType: "Premium",
  },
  {
    id: 12,
    fullName: "Karim Sefrioui",
    email: "karim.sefrioui@email.com",
    phone: "+212 6 22 11 00 99",
    membershipDate: "2024-01-28",
    status: "active",
    borrowedBooks: 3,
    totalBorrowed: 11,
    membershipType: "Regular",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
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


function StatusBadge({ status }) {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-xs bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xs bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Inactive
    </span>
  );
}

function TypeBadge({ type }) {
  if (type === "Premium") {
    return (
      <span className="inline-flex items-center rounded-xs bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-600/20">
        ★ Premium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-xs bg-gray-80 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
      Regular
    </span>
  );
}

function MemberDetailModal({ member, onClose, onToggleStatus }) {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center   p-4 bg-black/40 "
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-white "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${getAvatarColor(member.id)}`}
            >
              {getInitials(member.fullName)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.fullName}
              </h3>
              <StatusBadge status={member.status} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4 ">
          <DetailRow icon={<HiOutlineMail className="h-4 w-4" />} label="Email" value={member.email} />
          <DetailRow icon={<HiOutlinePhone className="h-4 w-4" />} label="Phone" value={member.phone} />
          <DetailRow icon={<HiOutlineCalendar className="h-4 w-4" />} label="Member since" value={formatDate(member.membershipDate)} />
          <DetailRow icon={<HiOutlineBookOpen className="h-4 w-4" />} label="Currently borrowed" value={`${member.borrowedBooks} book${member.borrowedBooks !== 1 ? "s" : ""}`} />
          <DetailRow icon={<MdPeopleAlt className="h-4 w-4" />} label="Total borrowed" value={`${member.totalBorrowed} book${member.totalBorrowed !== 1 ? "s" : ""}`} />
          <DetailRow icon={<IoFilter className="h-4 w-4" />} label="Membership type" value={member.membershipType} />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onToggleStatus(member.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition ${
              member.status === "active"
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {member.status === "active" ? "Deactivate Member" : "Activate Member"}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function MemberPage() {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: SORT_DIR.ASC,
  });
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [detailModal, setDetailModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 8;

  // ── Derived data ────────────────────────────────────────────────────────
  const filteredMembers = useMemo(() => {
    let result = [...members];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.fullName.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.phone.includes(q)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((m) => m.status === statusFilter);
    }

    if (typeFilter !== "all") {
      result = result.filter((m) => m.membershipType === typeFilter);
    }

    if (sortConfig.direction !== SORT_DIR.NONE) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];
        if (typeof valA === "string") {
          valA = valA.toLowerCase();
          valB = valB.toLowerCase();
        }
        if (valA < valB) return sortConfig.direction === SORT_DIR.ASC ? -1 : 1;
        if (valA > valB) return sortConfig.direction === SORT_DIR.ASC ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [members, searchQuery, statusFilter, typeFilter, sortConfig]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage]);

  const stats = useMemo(() => {
    const active = members.filter((m) => m.status === "active").length;
    const inactive = members.filter((m) => m.status === "inactive").length;
    const totalBorrowed = members.reduce((sum, m) => sum + m.borrowedBooks, 0);
    return { total: members.length, active, inactive, totalBorrowed };
  }, [members]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: nextDirection(prev.direction) };
      }
      return { key, direction: SORT_DIR.ASC };
    });
  }, []);

  const handleToggleStatus = useCallback((id) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
    setActionMenuOpen(null);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedMembers.size === paginatedMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(paginatedMembers.map((m) => m.id)));
    }
  }, [paginatedMembers, selectedMembers]);

  const handleSelectMember = useCallback((id) => {
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleBulkToggle = useCallback(
    (newStatus) => {
      setMembers((prev) =>
        prev.map((m) =>
          selectedMembers.has(m.id) ? { ...m, status: newStatus } : m
        )
      );
      setSelectedMembers(new Set());
    },
    [selectedMembers]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    setSelectedMembers(new Set());
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSortConfig({ key: "fullName", direction: SORT_DIR.ASC });
    setCurrentPage(1);
  }, []);

  const hasActiveFilters =
    searchQuery !== "" || statusFilter !== "all" || typeFilter !== "all";

  // Close action menu on outside click
  const handleTableClick = useCallback(() => {
    setActionMenuOpen(null);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-100 sm:p-2 lg:p-0 w-full" onClick={handleTableClick}>

     
      <div className="space-y-10 bg-gray-100 w-full">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
           <p className=" mt-1 text-sm text-gray-500">
              Manage library members — people are added automatically when they
              borrow their first book.
            </p>
          </div>
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
        </div>

        {/* ── Stats Cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 ">
          <StatCard
            label="Total Members"
            value={stats.total}
            icon={<MdPeopleAlt className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            label="Active"
            value={stats.active}
            icon={<HiOutlineCheck className="h-5 w-5" />}
            color="emerald"
          />
          <StatCard
            label="Inactive"
            value={stats.inactive}
            icon={<MdPersonOff className="h-5 w-5" />}
            color="gray"
          />
          <StatCard
            label="Books Borrowed"
            value={stats.totalBorrowed}
            icon={<HiOutlineBookOpen className="h-5 w-5" />}
            color="teal"
          />
        </div>

        {/* ── Toolbar ────────────────────────────────────────────────────── */}
        <div className="bg-white p-4 rounded-t-lg shadow-sm">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
            <SearchBar
              placeholder="Search by name, email, or phone…"
              searchTerm={searchQuery}
              setSearchTerm={(val) => { setSearchQuery(val); setCurrentPage(1); }}
              onFilterClick={() => setShowFilters(!showFilters)}
              isFilterActive={showFilters}
            />
          </div>

          {/* ── Expandable Filters ────────────────────────────────────────── */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 animate-in fade-in">
              {/* Status filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Status:
                </span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setStatusFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        statusFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Type:
                </span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "Regular", label: "Regular" },
                    { value: "Premium", label: "Premium" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTypeFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        typeFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Bulk Actions ──────────────────────────────────────────────── */}
          {selectedMembers.size > 0 && (
            <div className="mt-4 flex items-center gap-3 border-t border-green-100 bg-green-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
              <span className="text-xs font-medium text-green-700">
                {selectedMembers.size} selected
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBulkToggle("active");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-green-600"
              >
                <HiOutlineCheck className="h-3.5 w-3.5" />
                Activate
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleBulkToggle("inactive");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <HiOutlineBan className="h-3.5 w-3.5" />
                Deactivate
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMembers(new Set());
                }}
                className="ml-auto text-xs text-gray-500 hover:text-gray-700 transition"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-100 ">
                  <th className="w-12 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={
                        paginatedMembers.length > 0 &&
                        selectedMembers.size === paginatedMembers.length
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                    />
                  </th>
                  {[
                    { key: "fullName", label: "Member" },
                    { key: "membershipType", label: "Type" },
                    { key: "borrowedBooks", label: "Borrowed" },
                    { key: "totalBorrowed", label: "Total" },
                    { key: "membershipDate", label: "Joined" },
                    { key: "status", label: "Status" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="cursor-pointer select-none px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon
                          columnKey={col.key}
                          sortConfig={sortConfig}
                        />
                      </div>
                    </th>
                  ))}
                  <th className="w-16 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedMembers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-4 py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <MdPeopleAlt className="h-10 w-10 text-gray-300" />
                        <p className="text-sm font-medium text-gray-500">
                          No members found
                        </p>
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
                  paginatedMembers.map((member) => (
                    <tr
                      key={member.id}
                      className={`group transition ${
                        selectedMembers.has(member.id)
                          ? "bg-green-50/60"
                          : "hover:bg-gray-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedMembers.has(member.id)}
                          onChange={() => handleSelectMember(member.id)}
                          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                        />
                      </td>

                      {/* Member info */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(member.id)}`}
                          >
                            {getInitials(member.fullName)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {member.fullName}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3.5">
                        <TypeBadge type={member.membershipType} />
                      </td>

                      {/* Borrowed */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-medium ${
                            member.borrowedBooks > 0
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          <HiOutlineBookOpen className="h-3.5 w-3.5" />
                          {member.borrowedBooks}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3.5 text-sm text-gray-600">
                        {member.totalBorrowed}
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3.5 text-sm text-gray-500">
                        {formatDate(member.membershipDate)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge status={member.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuOpen(
                                actionMenuOpen === member.id
                                  ? null
                                  : member.id
                              );
                            }}
                            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 focus:opacity-100"
                          >
                            <HiOutlineDotsVertical className="h-4 w-4" />
                          </button>

                          {actionMenuOpen === member.id && (
                            <div
                              className="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  setDetailModal(member);
                                  setActionMenuOpen(null);
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                              >
                                <HiOutlineEye className="h-4 w-4 text-gray-400" />
                                View Details
                              </button>
                              <button
                                onClick={() => handleToggleStatus(member.id)}
                                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition hover:bg-gray-50 ${
                                  member.status === "active"
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {member.status === "active" ? (
                                  <>
                                    <HiOutlineBan className="h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <HiOutlineCheck className="h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ────────────────────────────────────────────────── */}
            <Pagination 
              onPrev={() => handlePageChange(currentPage - 1)}
              onNext={() => handlePageChange(totalPages)}
              currentPage={currentPage}
              totalPages={totalPages}
              />
          
        </div>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────────── */}
      <MemberDetailModal
        member={detailModal}
        onClose={() => setDetailModal(null)}
        onToggleStatus={(id) => {
          handleToggleStatus(id);
          setDetailModal(null);
        }}
      />

    </div>
  );
}