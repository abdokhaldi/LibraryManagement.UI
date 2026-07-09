import { useState, useEffect, useCallback, useMemo } from "react";
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
import { getMembers } from '../../services/memberService';

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
  const key = String(id);
  const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
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

function StatusBadge({ isActive }) {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Inactive
    </span>
  );
}

function MemberDetailModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ${getAvatarColor(member.memberID)}`}
            >
              {getInitials(member.person?.fullName || "")}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.person?.fullName}
              </h3>
              <StatusBadge isActive={member.isActive} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <DetailRow icon={<HiOutlineMail className="h-4 w-4" />} label="Email" value={member.person?.email || "—"} />
          <DetailRow icon={<HiOutlinePhone className="h-4 w-4" />} label="Phone" value={member.person?.phoneNumber || "—"} />
          <DetailRow icon={<HiOutlineCalendar className="h-4 w-4" />} label="Member since" value={formatDate(member.membershipDate)} />
          <DetailRow icon={<HiOutlineBookOpen className="h-4 w-4" />} label="Currently borrowed" value={`${member.currentlyBorrowedBooks ?? 0} book(s)`} />
          <DetailRow icon={<MdPeopleAlt className="h-4 w-4" />} label="Total borrowed" value={`${member.totalBorrowedBooks ?? 0} book(s)`} />
          <DetailRow icon={<IoFilter className="h-4 w-4" />} label="Membership type" value={member.membershipType || "—"} />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
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
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: SORT_DIR.ASC,
  });
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [detailModal, setDetailModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  // ── Fetch members from API ─────────────────────────────────────────────
  const fetchMembersData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getMembers({
        pageNumber: currentPage,
        pageSize: pageSize,
        searchTerm: searchQuery,
        orderBy: "",
      });
      setMembers(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, sortConfig]);

  useEffect(() => {
    fetchMembersData();
  }, [fetchMembersData]);

  // ── Derived data ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const active = members.filter((m) => m.isActive).length;
    const inactive = members.filter((m) => !m.isActive).length;
    const totalBorrowed = members.reduce(
      (sum, m) => sum + (m.currentlyBorrowedBooks || 0),
      0
    );
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
    setCurrentPage(1);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedMembers.size === members.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(members.map((m) => m.memberID)));
    }
  }, [members, selectedMembers]);

  const handleSelectMember = useCallback((memberID) => {
    setSelectedMembers((prev) => {
      const next = new Set(prev);
      if (next.has(memberID)) next.delete(memberID);
      else next.add(memberID);
      return next;
    });
  }, []);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedMembers(new Set());
    }
  }, [totalPages]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSortConfig({ key: "fullName", direction: SORT_DIR.ASC });
    setCurrentPage(1);
  }, []);

  const hasActiveFilters = searchQuery !== "";

  // Close action menu on outside click
  const handleTableClick = useCallback(() => {
    setActionMenuOpen(null);
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading members from server...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 sm:p-2 lg:p-0 w-full" onClick={handleTableClick}>
      <div className="space-y-6 bg-gray-100 w-full">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <p className="mt-1 text-sm text-gray-500">
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
        <div className="grid gap-4 sm:grid-cols-4">
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
              placeholder="Search members…"
              searchTerm={searchQuery}
              setSearchTerm={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              onFilterClick={() => setShowFilters(!showFilters)}
              isFilterActive={showFilters}
            />
          </div>

          {/* ── Bulk Actions ──────────────────────────────────────────────── */}
          {selectedMembers.size > 0 && (
            <div className="mt-4 flex items-center gap-3 border-t border-green-100 bg-green-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
              <span className="text-xs font-medium text-green-700">
                {selectedMembers.size} selected
              </span>
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
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="w-12 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={
                        members.length > 0 &&
                        selectedMembers.size === members.length
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                    />
                  </th>
                  {[
                    { key: "fullName", label: "Member" },
                    { key: "membershipDate", label: "Joined" },
                    { key: "currentlyBorrowedBooks", label: "Borrowed" },
                    { key: "totalBorrowedBooks", label: "Total" },
                    { key: "isActive", label: "Status" },
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
                  <th className="w-16 px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {members.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <MdPeopleAlt className="h-10 w-10 text-gray-300" />
                        <p className="text-sm font-medium text-gray-500">
                          No members found
                        </p>
                        <p className="text-xs text-gray-400">
                          Try adjusting your search criteria
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
                  members.map((member) => (
                    <tr
                      key={member.memberID}
                      className={`group transition ${
                        selectedMembers.has(member.memberID)
                          ? "bg-green-50/60"
                          : "hover:bg-gray-50/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedMembers.has(member.memberID)}
                          onChange={() => handleSelectMember(member.memberID)}
                          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                        />
                      </td>

                      {/* Member info */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(member.memberID)}`}
                          >
                            {getInitials(member.person?.fullName || "")}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {member.person?.fullName}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {member.person?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3.5 text-sm text-gray-500">
                        {formatDate(member.membershipDate)}
                      </td>

                      {/* Borrowed */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-medium ${
                            (member.currentlyBorrowedBooks || 0) > 0
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          <HiOutlineBookOpen className="h-3.5 w-3.5" />
                          {member.currentlyBorrowedBooks ?? 0}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-4 py-3.5 text-sm text-gray-600">
                        {member.totalBorrowedBooks ?? 0}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <StatusBadge isActive={member.isActive} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActionMenuOpen(
                                actionMenuOpen === member.memberID
                                  ? null
                                  : member.memberID
                              );
                            }}
                            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 focus:opacity-100"
                          >
                            <HiOutlineDotsVertical className="h-4 w-4" />
                          </button>

                          {actionMenuOpen === member.memberID && (
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
          {members.length > 0 && (
            <Pagination
              onNext={() => handlePageChange(currentPage + 1)}
              onPrev={() => handlePageChange(currentPage - 1)}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────────────── */}
      <MemberDetailModal
        member={detailModal}
        onClose={() => setDetailModal(null)}
      />
    </div>
  );
}