
import { FaEllipsisV } from "react-icons/fa";
import DropDownActions from './DropDownActions';

function BookRow({ book, isSelected, onSelect, onOpenDetails, onEdit, onDelete, isActionsOpen, setActionRow, actionRef }) {
  return (
    <tr
      className={`border-b cursor-pointer ${isSelected ? 'relative z-50 bg-gray-100' : ''}`}
      onClick={onSelect}
    >
      <td className="p-4 flex items-center gap-5">
        <span className={`mr-2 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetails(book); }}
            className="text-blue-500 underline text-sm"
          >
            Details
          </button>
        </span>
        <img src={book.coverImage} alt={book.title} className="w-14 h-18 object-cover" />
      </td>
      <td className="p-4 font-medium">{book.title}</td>
      <td className="p-4">{book.author}</td>
      <td className="p-4 text-gray-600">{book.isbn}</td>
      <td className="p-4 relative">
  {book.availableCopies}
  
  
  <div className="absolute right-5 top-1/2 -translate-y-1/2">
    <div ref={isActionsOpen ? actionRef : null} className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
         
          setActionRow(isActionsOpen ? null : book.id);
        }}
        disabled={!isSelected}
        className=" text-gray-400 hover:text-gray-700 p-2 block"
      >
        <FaEllipsisV />
      </button>

      {isActionsOpen && (
        <div className="absolute right-0 top-full mt-1">
           <DropDownActions 
             onEdit={(e) => { e.stopPropagation(); onEdit(book); }}
             onDelete={(e) => { e.stopPropagation(); onDelete(book.id); }}
             onBorrow={(e) => { e.stopPropagation(); onOpenDetails(book); }}
           />
        </div>
      )}
      
    </div>
 </div>
</td>
    </tr>
  );
}

export default BookRow;