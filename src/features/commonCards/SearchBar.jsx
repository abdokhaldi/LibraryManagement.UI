import { FaFilter, FaSearch } from 'react-icons/fa';

function SearchBar({ placeholder, searchTerm, setSearchTerm, onFilterClick, isFilterActive }) {
  return (
    <div className="flex items-center gap-3 flex-1 min-w-75">
      <div className="relative flex-1">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={placeholder || "Search..."}
          className="w-full pl-11 pr-4 py-2.5 bg-slate-200 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition-all text-slate-700 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button
        onClick={onFilterClick}
        className={`p-2.5 rounded-xl transition-all ${isFilterActive ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-200'}`}
      >
        <FaFilter size={18} />
      </button>
    </div>
  );
}

export default SearchBar;