const SpinnerLoadingComponent = () => {
    return (
        <div className="row justify-content-center align-items-center">
            <div style={{ width: '100px', height: '100px' }} className="spinner-border theme-color spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default SpinnerLoadingComponent;
