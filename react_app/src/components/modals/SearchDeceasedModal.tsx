import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '@/api';
import useFxn from '@/utils/useFunctions';
import SpinnerLoadingComponent from '@/components/SpinnerLoadingComponent';

const SearchDeceasedModal = () => {
    const { appName, searchModal, toggleSearchModal } = useAppStore();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Refs for bootstrap modal control
    const openModalBtnRef = useRef<HTMLButtonElement>(null);
    const closeModalBtnRef = useRef<HTMLButtonElement>(null);

    const [state, setState] = useState({
        searchStr: '',
        isSearching: true,
        searchResults: [] as any[],
    });

    const debouncedSearch = useRef(
        useFxn.debounce(async (searchStr: string) => {
             if (searchStr) {
                try {
                    setState(s => ({ ...s, isSearching: true, searchResults: [] })); 
                    // Note: isSearching true to show spinner while waiting
                    let resp = await api.search(searchStr);
                    setState(s => ({ ...s, searchResults: resp.data, isSearching: false }));
                } catch (error) {
                    setState(s => ({ ...s, isSearching: false }));
                }
            } else {
                 setState(s => ({ ...s, isSearching: false, searchResults: [] }));
            }
        }, 300)
    ).current;

    const onInputFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setState(s => ({ ...s, searchStr: val, isSearching: true }));
        debouncedSearch(val);
    };

    const goToDeceasedPage = (item: { id: number; deceased: string }) => {
        closeModalBtnRef.current?.click();
        const name = item.deceased.replace(/\s+/g, '-');
        navigate(`/condo/${item.id}/${name}`);
        // Reset state optionally
    };

    // Watchers
    useEffect(() => {
        if (searchModal) {
            openModalBtnRef.current?.click();
            // Reset search state when opening?
            // setState({ searchStr: '', isSearching: false, searchResults: [] });
            // Or keep it? Vue code keeps it reactive.
        }
    }, [searchModal]);

    // Close on route change
    useEffect(() => {
        closeModalBtnRef.current?.click();
    }, [location]);


    return (
        <div>
            {/* Modal trigger button */}
            <button ref={openModalBtnRef} className="btn d-none" data-bs-toggle="modal" data-bs-target="#searchModal">
            </button>

            <div className="modal fade" id="searchModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false"
                role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header p-3 bg-theme border-0">
                            <h5 className="modal-title text-white fw-bold text-center">{appName}.</h5>
                             {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div className="modal-body rounded-0">

                            <div className="input-group mb-3 border-5">
                                <label className="input-group-text bg-transparent text-muted border-end-0 pe-0 ">
                                    <i className="bi bi-search"></i>
                                </label>

                                <input 
                                    onInput={onInputFunction} 
                                    value={state.searchStr}
                                    type="text"
                                    className="form-control form-control-lg border-start-0" 
                                    placeholder="search by name.."
                                    aria-label="Search" 
                                />
                            </div>

                            {state.searchStr && (
                                <div className="col-12">
                                    <div className="card bg-light-subtle">
                                        <div className="card-body results-card" style={{ height: '300px', overflowY: 'auto' }}>
                                            {!state.isSearching ? (
                                                state.searchResults.length ? (
                                                    <ul className="list-group list-group-flush">
                                                        {state.searchResults.map((item, index) => (
                                                            <li key={index}
                                                                onClick={() => goToDeceasedPage(item)}
                                                                className="list-group-item ps-0 text-capitalize cursor-pointer bg-transparent">
                                                                <span className="fw-bold text-warning-emphasis me-2">{item.deceased}</span>
                                                                ({new Date(item.birth_date).getFullYear()} - {new Date(item.death_date).getFullYear()})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-muted text-center pt-4">
                                                        No results found.
                                                    </div>
                                                )
                                            ) : (
                                                <SpinnerLoadingComponent />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="modal-footer border-0">
                            <button 
                                ref={closeModalBtnRef} 
                                onClick={() => { if(searchModal) toggleSearchModal() }} // Sync state if closed via button
                                type="button" 
                                className="btn" 
                                data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDeceasedModal;
