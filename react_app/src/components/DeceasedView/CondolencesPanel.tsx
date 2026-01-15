import useFxn from '@/utils/useFunctions';

const CondolencesPanel = ({ condolences }: { condolences: any[] }) => {
    return (
        <div>
            {condolences && condolences.length > 0 ? (
                <ul className="list-group list-group-flush">
                     {condolences.map((condo, index) => (
                        <li key={index} className="list-group-item bg-transparent fst-italic pe-lg-5">
                            <div> "{condo.condolence}" </div>
                            <div>
                                <i className="bi bi-dash"></i>
                                <span>
                                    <span className="fw-bolder">{condo.condo_name}</span>
                                    <span className="fw-normal ms-1"> {condo.relationship ? `(${condo.relationship})` : ''}</span>
                                    <span className="small text-muted float-end">{condo.created_at ? useFxn.dateDisplay(condo.created_at) : ''}</span> 
                                    {/* Note: Vue code used condo.created, verify API response field name. Assuming created_at or created */}
                                </span>
                            </div>
                        </li>
                     ))}
                </ul>
            ) : (
                <div className="fst-italic">
                    No Condolences, click on the <b>icon: </b> <i className="bi bi-pencil small"></i> to add yours.
                </div>
            )}
        </div>
    );
};

export default CondolencesPanel;
