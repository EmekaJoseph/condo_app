import { useState, useEffect } from 'react';
import useFxn from '@/utils/useFunctions';
import api from '@/api';
import CustomPagination from '@/components/CustomPagination';
import LoadingComponent from '@/components/LoadingComponent';

const HistoryTab = () => {
    const [list, setList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchString, setSearchString] = useState('');
    const [paginate, setPaginate] = useState({
        currentPage: 0,
        totalPages: 0,
        perPage: 0,
        totalRecords: 0
    });

    // const { showDeceasedCopyModal } = useAppStore(); // Need to verify if this exists in store

    const loadHistory = async (page = 1) => {
        // isLoading is handled initially, for pagination we might not want full flicker? 
        // Vue version didn't set isLoading=true on page change inside function (commented out), but initially yes.
        try {
            const resp = await api.userUploads(searchString, page);
            setList(resp.data.data);
            setPaginate({
                currentPage: resp.data.current_page,
                totalPages: resp.data.last_page,
                perPage: resp.data.per_page,
                totalRecords: resp.data.total
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHistory();
    }, []);

    // Debounce search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            loadHistory(1);
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [searchString]);

    const paginateToNext = (page: number) => {
        window.scrollTo(0, 0);
        loadHistory(page);
    };

    const deleteRecord = (id: string | number) => {
        useFxn.confirmDelete('The Entire Record will be deleted?', 'Yes. Delete')
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await api.userDeleteDeceased(id);
                        useFxn.toast('Record deleted', 'success');
                        loadHistory(paginate.currentPage);
                    } catch (error) {
                        // ignore
                    }
                }
            });
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <div className="container mt-3">
            <div className="row justify-content-center min-vh-100 g-3">
                <div className="col-md-12">
                     <div className="card min-vh-100">
                        {list.length > 0 && (
                            <div className="card-header bg-transparent border-0 small">
                                <div className="d-lg-flex justify-content-start">
                                    <div className="me-3 text-muted">
                                        Showing <span className="fw-bold">{paginate.currentPage}/{paginate.totalPages}</span> pages
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <div className="col-md-6 col-lg-4 float-lg-end">
                                        <div className="input-group bg-transparent">
                                            <input 
                                                value={searchString}
                                                onChange={e => setSearchString(e.target.value)}
                                                type="text" className="form-control border-end-0" placeholder="search here.." />
                                            <span className="input-group-text bg-transparent">
                                                <i className="bi bi-search"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {list.length === 0 ? (
                                <div className="d-flex justify-content-center my-5">
                                    <div className="text-center">
                                        <i className="bi bi-exclamation-circle text-muted" style={{ fontSize: '4rem' }}></i>
                                        <div>No history</div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <div className="table-responsive">
                                                <table className="table table-sm table-striped text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>S/N</th>
                                                            <th>NAME</th>
                                                            <th>DATES</th>
                                                            <th>UPLOADED</th>
                                                            <th>POSTED BY</th>
                                                            <th>CONDOLENCES</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {list.map((record, index) => (
                                                            <tr key={record.id}>
                                                                <th>{(paginate.currentPage - 1) * paginate.perPage + index + 1}</th>
                                                                <td>
                                                                    <button 
                                                                        // onClick={() => showDeceasedCopyModal(record)} 
                                                                        className="btn btn-link fw-bold btn-s border-0 p-0 theme-color">
                                                                        {record.deceased}
                                                                    </button>
                                                                </td>
                                                                <td>({useFxn.dateDisplay(record.birth_date)} - {useFxn.dateDisplay(record.death_date)})</td>
                                                                <td>{useFxn.dateDisplay(record.created_at)}</td>
                                                                <td>{record.admin?.email}</td>
                                                                <td>{record.condolences}</td>
                                                                <td>
                                                                    <button onClick={() => deleteRecord(record.id)} className="btn btn-outline-danger btn-sm border-0">
                                                                        <i className="bi bi-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 d-flex justify-content-center">
                                        <CustomPagination 
                                            currentPage={paginate.currentPage}
                                            perPage={paginate.perPage}
                                            totalRecords={paginate.totalRecords}
                                            onMoveToNext={paginateToNext}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryTab;
