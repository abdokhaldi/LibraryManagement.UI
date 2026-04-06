import { FaFilter, FaSearch } from "react-icons/fa";

function SearchBar ({ searchTerm, setSearchTerm, onFilterClick }) {

 return ( <div className='flex items-center gap-3 w-full max-w-2xl'>
    <div className="relative flex-1">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <FaSearch size={18} color="white" />
      </span>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-12 pl-10 pr-4 rounded-xl bg-gray-400 border-none outline-none text-white placeholder:text-white" 
        placeholder="Search by title, member..."
      />
    </div>
    <button 
      onClick={onFilterClick}
      className="p-3 rounded-xl bg-gray-400 active:bg-black transition-colors"
    >
      <FaFilter size={20} color="white" />
    </button> 
  </div>
);
}
export default SearchBar;