import { useAppStore } from '@/store/useAppStore';

const CondoBtn = () => {
    const { toggleCondoModal } = useAppStore();

    return (
        <div className="fixed-bottom-btn animate__animated animate__heartBeat animate__delay-3s" style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 999 }}>
            <div onClick={toggleCondoModal} className="justify-content-end floatPanel" style={{ marginBottom: '60px', paddingRight: '24px', display: 'flex', zIndex: 999, position: 'relative', transition: 'all ease-in-out 0.4s', fontSize: '11px', cursor: 'pointer' }}>
                <div className="card btnCard shadow" style={{ width: '55px', height: '55px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.43rem', color: '#fff', backgroundColor: 'var(--theme-color)' }}>
                    <div><i className="bi bi-pencil"></i></div>
                </div>
            </div>
        </div>
    );
};

export default CondoBtn;
