import BookRow from './BookRow';

function BookTable({books, selectedRowId, onRowClick, onKeyDown, onOpenDetails, onEdit, onDelete, actionRow, setActionRow, actionRef }) {
  return (
    <div className="bg-white rounded-lg overflow-visible">
      <table 
        className="w-full text-left border-collapse"
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <thead>
          <tr className="bg-slate-50 text-xs font-bold text-gray-500 uppercase">
             <th className="p-4">Cover</th>
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">ISBN</th>
            <th className="p-4">Available</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xm font-medium text-gray-700">
          {books.map((book, index) => (
            <BookRow 
              key={book.bookID}
              book={book}
              isSelected={selectedRowId === book.bookID}
              onSelect={() => onRowClick(book.bookID, index)}
              onOpenDetails={onOpenDetails}
              onEdit={onEdit}
              onDelete={onDelete}
              isActionsOpen={actionRow === book.bookID}
              setActionRow={setActionRow}
              actionRef={actionRef}
              isLastRow={index === books.length - 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;