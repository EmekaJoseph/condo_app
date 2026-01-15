import { Modal } from 'react-bootstrap';
import { useAppStore } from '@/store/useAppStore';

const ImageViewModal = () => {
    const { imageModal, toggleImageModal, currentImageToShow } = useAppStore();

    const handleClose = () => {
        if (imageModal) toggleImageModal();
    };

    return (
        <Modal show={imageModal} onHide={handleClose} centered size="lg" className="bg-transparent border-0">
            <Modal.Body className="p-0 bg-transparent text-center position-relative">
                {currentImageToShow && (
                    <>
                         <button 
                            onClick={handleClose}
                            type="button" 
                            className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3" 
                            aria-label="Close" 
                            style={{ filter: 'invert(1) grayscale(100%) brightness(200%)' }} // Make close button white if needed
                        ></button>
                        <img src={currentImageToShow.url} alt="Large View" className="img-fluid rounded shadow" style={{ maxHeight: '90vh' }} />
                        {currentImageToShow.caption && <div className="text-white mt-2">{currentImageToShow.caption}</div>}
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ImageViewModal;
