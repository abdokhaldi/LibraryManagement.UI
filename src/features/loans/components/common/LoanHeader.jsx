import SearchBar from "../../../commonCards/SearchBar";
import { FaPlus } from 'react-icons/fa';
import AddRecordButton from "../../../commonCards/AddRecordButton";

export function LoanHeader({
  searchTerm,
  setSearchTerm,
  onFilterClick,
  isFilterActive,
  onNewLoanClick,
}) {
  return (
    <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
      <SearchBar
        placeholder="Search by barcode, member, or book title..."
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onFilterClick={onFilterClick}
        isFilterActive={isFilterActive}
      />
      <AddRecordButton 
      onClick={onNewLoanClick}
      label="Add New Loan"
      className="px-8 py-2.5"
      />
      
    </div>
  );
}
