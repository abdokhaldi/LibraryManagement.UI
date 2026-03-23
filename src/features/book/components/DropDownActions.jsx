
import { FiEdit, FiTrash, FiBook } from 'react-icons/fi';


function DropDownActions({onEdit, onDelete, onBorrow}){
    return(
      <div className="absolute right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-2xl flex flex-col overflow-hidden ring-1 ring-black ring-opacity-5">
          <button onClick={onEdit} className="p-3 bg-white hover:bg-gray-50 flex items-center gap-2 text-blue-600 border-b border-gray-100">
            <FiEdit /> <span className="text-gray-800">Edit</span>
          </button>
          <button onClick={onDelete} className="p-3 bg-white hover:bg-gray-50 flex items-center gap-2 text-red-600 border-b border-gray-100">
            <FiTrash /> <span className="text-gray-800">Delete</span>
          </button>
          <button onClick={onBorrow} className="p-3 bg-white hover:bg-gray-50 flex items-center gap-2 text-green-600">
            <FiBook /> <span className="text-gray-800">Borrow</span>
          </button>
      </div>
    );
}

export default DropDownActions;