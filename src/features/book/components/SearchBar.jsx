import { FaFilter, FaSearch } from "react-icons/fa";

function SearchBar ({ searchTerm, setSearchTerm, onFilterClick }) {

 return ( <div className='flex items-center gap-3 w-full max-w-2xl'>
    <div className="relative flex-1">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <FaSearch size={18} />
      </span>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-100 border-none outline-none" 
        placeholder="Search by title, member..."
      />
    </div>
    <button 
      onClick={onFilterClick}
      className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <FaFilter size={20} />
    </button> 
  </div>
);
}
export default SearchBar;