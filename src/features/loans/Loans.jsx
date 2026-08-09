import { useEffect, useRef, useState } from 'react';
import LoanPagination from '../Pagination/Pagination';
import { getLoans, returnBook } from '../../services/loanService';
import { PAGE_SIZE } from './constants';

import { LoanStats } from './components/common/LoanStats';
import { LoanHeader } from './components/common/LoanHeader';
import { LoanFilters } from './components/filters/LoanFilters';
import { LoanTable } from './components/table/LoanTable';
import FinesHistoryModal from './components/modals/FinesHistoryModal';
import ExtendModal from './components/modals/ExtendModal';
import ScanModal from './components/modals/ScanModal';
import { SubHeader } from '../commonCards/SubHeader.jsx';

export default function Loans() {
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showBorrowModal, setShowBorrowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loansData, setLoansData] = useState([]);
    const [showActions, setShowActions] = useState(null);
    const [finesModalOpen, setFinesModalOpen] = useState(false);
    const [finesBorrowingId, setFinesBorrowingId] = useState(0);
    const [extendModalOpen, setExtendModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const actionRef = useRef(null);

    // Load loans data
    const loadLoansData = async () => {
        try {
            const result = await getLoans({ searchTerm, currentPage, pageSize: PAGE_SIZE });
            setLoansData(result.data);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.error("Data load failed:", error);
            alert("Some error occurred on the server");
        }
    };

    useEffect(() => {
        loadLoansData();
    }, [currentPage, searchTerm]);

    // Handle outside click for dropdown
    useEffect(() => {
        if (!showActions) return;
        const handleOutsideClick = (e) => {
            if (actionRef.current && !actionRef.current.contains(e.target)) setShowActions(null);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [showActions]);

    const handleReturnBook = async (id) => {
        try {
            const result = await returnBook(id);
            if (result.success) {
                loadLoansData();
            } else {
                alert(result.errorMessage);
            }
        } catch (error) {
            alert("Some error occurred on the server");
        }
    };

    const handleOpenExtendModal = (loan) => {
        setSelectedLoan(loan);
        setExtendModalOpen(true);
        setShowActions(null);
    };

    const handleCloseExtendModal = () => {
        setExtendModalOpen(false);
        setSelectedLoan(null);
    };

    const handleOpenFinesModal = (borrowingId) => {
        setFinesBorrowingId(borrowingId);
        setFinesModalOpen(true);
    };

    const handleCloseFinesModal = () => {
        setFinesModalOpen(false);
    };

    const handleLoanUpdated = () => {
        loadLoansData();
    };

    return (
        <div className="relative bg-gray-100 min-h-screen font-sans">
            {/* Modals */}
            {finesModalOpen && (
                <FinesHistoryModal
                    isOpen={finesModalOpen}
                    onClose={handleCloseFinesModal}
                    borrowingId={finesBorrowingId}
                />
            )}
            {showBorrowModal && (
                <ScanModal onClose={setShowBorrowModal} />
            )}
            {extendModalOpen && (
                <ExtendModal
                    isOpen={extendModalOpen}
                    onClose={handleCloseExtendModal}
                    borrowingId={selectedLoan?.borrowingID}
                    currentDueDate={selectedLoan?.dueDate}
                    onLoanUpdated={handleLoanUpdated}
                />
            )}

            {/* Stats Cards */}
            <SubHeader />
            <LoanStats loans={loansData} />

            {/* Table Section */}
            {!showBorrowModal && (
                <div className="bg-white rounded-t-lg shadow-sm overflow-hidden ">
                    {/* Header with Search & New Loan Button */}
                    <div className="border-b border-slate-100 bg-white p-5">
                    <LoanHeader
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onFilterClick={() => setShowFilter(!showFilter)}
                        isFilterActive={showFilter}
                        onNewLoanClick={() => setShowBorrowModal(true)}
                    />

                    {/* Filters */}
                    <LoanFilters
                        isOpen={showFilter}
                        filters={filters}
                        setFilters={setFilters}
                    />

                   </div>

                    {/* Table */}
                    <LoanTable
                        loans={loansData}
                        showActions={showActions}
                        setShowActions={setShowActions}
                        onReturnBook={handleReturnBook}
                        onOpenExtendModal={handleOpenExtendModal}
                        onViewFines={handleOpenFinesModal}
                    />

                    {/* Pagination */}
                    {loansData.length !== 0 && (
                        <LoanPagination
                            onNext={() => setCurrentPage(prev => prev + 1)}
                            onPrev={() => setCurrentPage(prev => prev - 1)}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            )}
        </div>
    );
}