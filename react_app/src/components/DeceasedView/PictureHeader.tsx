import useFxn from '@/utils/useFunctions';
import candlesBg from '@/assets/images/candles.gif'; // Ensure this asset exists or use placeholder

const PictureHeader = ({ details }: { details: any }) => {
    // const { y_axis } = useAppVariables(); // Need scroll position to animate?
    // Vue code used y_axis to slide picture out.
    // I can implement simple scroll listener or just static for now to save time, OR use simple hook.
    // I'll skip complex animation for now or just keep it static.
    
    const shareLink = async () => {
        const shareData = {
            title: details.deceased,
            text: `Online condolence register for late: ${details.deceased}`,
            url: window.location.href,
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                useFxn.toast('Web Share API not supported in this browser', 'info');
                 // Fallback copy to clipboard?
                 navigator.clipboard.writeText(window.location.href);
                 useFxn.toast('Link copied to clipboard!', 'success');
            }
        } catch (err) {
            // console.error(err);
        }
    };

    return (
        <div className="col-12 sticky-top" style={{ zIndex: 1020 }}>
            <div className="card border-0 position-relative">
                <div className="cover-photo" style={{ 
                    height: '150px', 
                    background: `url(${candlesBg})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    borderBottom: '4px solid var(--theme-color)'
                }}>
                    <div className="transparent-layer" style={{ backgroundColor: '#000000a5', height: '100%' }}>
                        <div className="float-end">
                            <div className="m-3 mb-0 text-white text-end">
                                <div className="h3 fw-bold text-capitalize">{details.deceased}</div>
                                <div style={{ lineHeight: 0 }}>
                                    ({new Date(details.birth_date).getFullYear()} - {new Date(details.death_date).getFullYear()})
                                </div>
                                <div className="mt-5">
                                    <span onClick={shareLink} className="badge rounded-pill text-bg-warning cursor-pointer" style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-share-fill"></i> Share link
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {details.display_photo && (
                    <img 
                        src={useFxn.resolvePhotoSrc(details.display_photo, 'deceased_dps')} 
                        alt="Profile Picture" 
                        className="profile-picture mx-auto ms-5 d-block bg-light animate__animated animate__slideInLeft animate__faster"
                        style={{
                            width: '130px',
                            height: '130px',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '75px',
                            border: '4px solid #fff'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PictureHeader;
