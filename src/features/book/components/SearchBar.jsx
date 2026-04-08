import { FaFilter, FaSearch } from "react-icons/fa";

function SearchBar ({ searchTerm, setSearchTerm, onFilterClick }) {

 return ( <div className='flex items-center gap-3 w-full max-w-2xl '>
    <div className="relative flex-1">
      <span className="absolute inset-y-0 left-3 flex items-center">
        <FaSearch size={18} color="white" />
      </span>
      <input 
        type="text" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-400 outline-none bg-gray-200 placeholder:text-gray-500" 
        placeholder="Search by title, isbn, author ..."
      />
    </div>
    <button 
      onClick={onFilterClick}
      className="p-3 rounded-xl bg-gray-200 active:bg-black transition-colors border border-gray-400"
    >
      <FaFilter size={20} color="black" />
    </button> 
  </div>
);
}
export default SearchBar;