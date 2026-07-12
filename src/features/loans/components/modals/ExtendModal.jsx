import React, { useState } from 'react';
import { extendLoanPeriod } from '../../../../services/loanService';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

export default function ExtendModal({ isOpen, onClose, borrowingId, currentDueDate, onLoanUpdated }) {
    const [newDueDate, setNewDueDate] = useState(currentDueDate);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleExtendLoan = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await extendLoanPeriod(borrowingId, newDueDate);
            if (result.success) {
                onClose();
                onLoanUpdated(); // To refresh the loans data in the parent component
            } else {
                setError(result.errorMessage || "Failed to extend loan.");
            }
        } catch (err) {
            setError("An error occurred while extending the loan.");
            console.error("Extend Loan Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
            <div className="relative p-8 border w-full max-w-md md:max-w-lg shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800">Extend Loan Period</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={20} />
                    </button>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                <div className="mt-4">
                    <label htmlFor="newDueDate" className="block text-sm font-medium text-gray-700 mb-2">Select New Due Date:</label>
                    <input
                        type="date"
                        id="newDueDate"
                        value={newDueDate.split('T')[0]} // Ensure correct format for date input
                        min={new Date(currentDueDate).toISOString().split('T')[0]} // Prevent setting a past date
                        onChange={(e) => setNewDueDate(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end items-center gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleExtendLoan}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Extending...' : (
                            <>
                                <FaCalendarAlt /> Extend Loan
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
