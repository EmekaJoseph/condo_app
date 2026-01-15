import useFxn from '@/utils/useFunctions';

const InfoPanel = ({ details }: { details: any }) => {
    return (
        <div className="row g-3">
            <div className="col-12">
                <div className="card shadow-sm">
                    <div className="card-header border-0 text-capitalize">
                        Late <span className="fw-bold">{details.deceased}</span>
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item px-0">
                                <span className="fw-bold">Born: </span>
                                <span>{useFxn.dateDisplay(details.birth_date)}</span>
                            </li>
                            <li className="list-group-item px-0">
                                <span className="fw-bold">Died: </span>
                                <span>{useFxn.dateDisplay(details.death_date)}</span>
                            </li>
                            <li className="list-group-item px-0">
                                <span className="fw-bold">Aged: </span>
                                <span>{details.age} years</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card shadow-sm">
                    <div className="card-header fw-bold border-0">
                        Biography & History
                    </div>
                    <div className="card-body">
                        <div dangerouslySetInnerHTML={{ __html: details.biography ?? '' }}></div>
                        <div dangerouslySetInnerHTML={{ __html: details.life_history ?? '' }}></div>
                    </div>
                </div>
            </div>
            {details?.survived_bys?.length > 0 && (
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header fw-bold border-0">
                            Survived By
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {details.survived_bys.map((surv: any, index: number) => (
                                    <li key={index} className="list-group-item px-0">
                                        {surv.survived_by} {surv.relationship ? `(${surv.relationship})` : ''}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfoPanel;
