"use client";

type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({totalPages, currentPage, onPageChange}: PaginationProps) {
    return (
        <div className="join">
        {Array.from({ length: totalPages }, (_, index) => (
            <input
            key={index}
            className="join-item btn btn-square"
            type="radio"
            name="pagination"
            aria-label={`Page ${index + 1}`}
            checked={currentPage === index + 1}
            onChange={() => onPageChange(index + 1)}
            />
        ))}
        </div>
    );
}
