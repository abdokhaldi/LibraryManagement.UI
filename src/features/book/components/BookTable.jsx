import BookRow from './BookRow';

function BookTable({books, selectedRowId, onRowClick, onKeyDown, onOpenDetails, onEdit, onDelete, actionRow, setActionRow, actionRef }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <table 
        className="w-full text-left border-collapse"
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <thead>
          <tr className="bg-gray-50 border-b text-gray-700 uppercase text-xs font-semibold">
            <th className="p-4">Cover</th>
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">ISBN</th>
            <th className="p-4">Available</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <BookRow 
              key={book.id}
              book={book}
              isSelected={selectedRowId === book.id}
              onSelect={() => onRowClick(book.id, index)}
              onOpenDetails={onOpenDetails}
              onEdit={onEdit}
              onDelete={onDelete}
              isActionsOpen={actionRow === book.id}
              setActionRow={setActionRow}
              actionRef={actionRef}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;