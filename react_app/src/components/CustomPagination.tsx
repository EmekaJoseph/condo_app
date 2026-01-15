import React from 'react';

interface Props {
    currentPage: number;
    perPage: number;
    totalRecords: number;
    onMoveToNext: (page: number) => void;
}

const CustomPagination: React.FC<Props> = ({ currentPage, perPage, totalRecords, onMoveToNext }) => {
    // Basic implementation for now, mirroring logic if possible
    // Vue checks totalRecords > perPage to show.
    
    if (totalRecords <= perPage) return null;

    const totalPages = Math.ceil(totalRecords / perPage);

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onMoveToNext(currentPage - 1)} disabled={currentPage <= 1}>
                        Previous
                    </button>
                </li>
                 <li className="page-item disabled">
                    <span className="page-link">
                         {currentPage} / {totalPages}
                    </span>
                 </li>
                <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onMoveToNext(currentPage + 1)} disabled={currentPage >= totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default CustomPagination;
