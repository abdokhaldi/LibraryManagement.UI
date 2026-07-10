import { PeopleTableRow } from "./PeopleTableRow";

export function PeopleTableBody({
  people,
  selectedPeople,
  onSelect,
  onViewDetails,
  onActionMenuToggle,
  actionMenuOpen,
  onEditPerson,
  onDeletePerson,
  onRowClick,
}) {
  return (
    <tbody className="divide-y divide-gray-50">
      {people.map((person) => (
        <PeopleTableRow
          key={person.personID}
          person={person}
          isSelected={selectedPeople.has(person.personID)}
          onSelect={onSelect}
          onViewDetails={onViewDetails}
          onActionMenuToggle={onActionMenuToggle}
          actionMenuOpen={actionMenuOpen}
          onEditPerson={onEditPerson}
          onDeletePerson={onDeletePerson}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  );
}