import { PeopleTableHeader } from "./PeopleTableHeader";
import { PeopleTableBody } from "./PeopleTableBody";
import  Pagination  from "../../../Pagination/Pagination";

export function PeopleTable({
  people,
  sortConfig,
  onSort,
  selectedPeople,
  onSelectAll,
  onSelect,
  onRowClick,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetails,
  onActionMenuToggle,
  actionMenuOpen,
  onEditPerson,
  onDeletePerson,
}) {
  if (people.length === 0) {
    return (
      <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <PeopleTableHeader onSort={onSort} sortConfig={sortConfig} />
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td colSpan={11} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500">No people found</p>
                    <p className="text-xs text-gray-400">Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <PeopleTableHeader onSort={onSort} sortConfig={sortConfig} selectedCount={selectedPeople.size} totalCount={people.length} onSelectAll={onSelectAll} />
          <PeopleTableBody
            people={people}
            selectedPeople={selectedPeople}
            onSelect={onSelect}
            onViewDetails={onViewDetails}
            onActionMenuToggle={onActionMenuToggle}
            actionMenuOpen={actionMenuOpen}
            onEditPerson={onEditPerson}
            onDeletePerson={onDeletePerson}
            onRowClick={onRowClick}
          />
        </table>
      </div>

      <Pagination
        onNext={() => onPageChange(currentPage + 1)}
        onPrev={() => onPageChange(currentPage - 1)}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}