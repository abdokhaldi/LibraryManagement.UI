import SearchBar from "../../../commonCards/SearchBar";
import { FaPlus } from 'react-icons/fa';

export function LoanHeader({
  searchTerm,
  setSearchTerm,
  onFilterClick,
  isFilterActive,
  onNewLoanClick,
}) {
  return (
    <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
      <SearchBar
        placeholder="Search by barcode, member, or book title..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilterClick={onFilterClick}
        isFilterActive={isFilterActive}
      />

      <button
        onClick={onNewLoanClick}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white px-8 py-2.5 rounded-md font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
      >
        <FaPlus /> New Loan
      </button>
    </div>
  );
}
