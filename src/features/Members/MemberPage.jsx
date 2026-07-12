import { useState, useEffect, useCallback, useMemo } from "react";
import { getMembers } from "../../services/memberService";
import { MemberHeader } from "./components/common/MemberHeader";
import { MemberStats } from "./components/common/MemberStats";
import { MemberTable } from "./components/table/MemberTable";
import { MemberFilters } from "./components/filters/MemberFilters";
import { MemberDetailModal } from "./components/modals/MemberDetailModal";
import { calculateMemberStats, SORT_DIR, nextDirection } from "./utils/memberHelpers";

const PAGE_SIZE = 8;

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

  // ── Fetch members from API ─────────────────────────────────────────────
  const fetchMembersData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getMembers({
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
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
  }, [currentPage, searchQuery, sortConfig]);

  useEffect(() => {
    fetchMembersData();
  }, [fetchMembersData]);

  // ── Derived data ────────────────────────────────────────────────────────
  const stats = useMemo(() => calculateMemberStats(members), [members]);

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

  const handleViewDetails = useCallback((member) => {
    setDetailModal(member);
    setActionMenuOpen(null);
  }, []);

  // Close action menu on outside click
  const handleTableClick = useCallback(() => {
    setActionMenuOpen(null);
  }, []);

  const hasActiveFilters = searchQuery !== "";

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
    <div className="bg-gray-100 min-h-screen" onClick={handleTableClick}>
      <div className="mx-auto space-y-6">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <MemberHeader />

        {/* ── Stats Cards ────────────────────────────────────────────────── */}
        <MemberStats stats={stats} />

        {/* ── Filters & Search ───────────────────────────────────────────── */}
        <MemberFilters
          members={members}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onFilterToggle={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />

        {/* ── Toolbar with Bulk Actions ──────────────────────────────────── */}
        {selectedMembers.size > 0 && (
          <div className="bg-white rounded-t-xl border border-gray-200 shadow-sm">
            <div className="p-4 flex items-center gap-3 border-b border-green-100 bg-green-50/50 rounded-t-xl -mx-4 mb-4 px-4 py-3">
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
          </div>
        )}

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <MemberTable
          members={members}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedMembers={selectedMembers}
          onSelectMember={handleSelectMember}
          onSelectAll={handleSelectAll}
          onViewDetails={handleViewDetails}
          actionMenuOpen={actionMenuOpen}
          setActionMenuOpen={setActionMenuOpen}
          detailModal={detailModal}
          onCloseDetailModal={() => setDetailModal(null)}
          onTableClick={handleTableClick}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
          emptyMessage="No members found"
        />
      </div>

      <MemberDetailModal user={detailModal} onClose={() => setDetailModal(null)} />
    </div>
  );
}
