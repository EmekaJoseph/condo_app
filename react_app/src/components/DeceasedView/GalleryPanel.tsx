import useFxn from '@/utils/useFunctions';
import { useAppStore } from '@/store/useAppStore';
import ImageViewModal from '@/components/modals/ImageViewModal';

const GalleryPanel = ({ gallery }: { gallery: any[] }) => {
    const { toggleImageModal, setImageToShow } = useAppStore();

    const showImage = (image: any) => {
        const url = useFxn.resolvePhotoSrc(image.gallery, 'galleries');
        setImageToShow({ url: url, caption: image.gallery_name });
        toggleImageModal();
    };

    if (!gallery || gallery.length === 0) return null;

    return (
        <div>
            <div className="row g-3">
                {gallery.map((image, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3 cursor-pointer">
                        <div className="card" onClick={() => showImage(image)} style={{ cursor: 'pointer' }}>
                             <img 
                                src={useFxn.resolvePhotoSrc(image.gallery, 'galleries')} 
                                className="card-img-top" 
                                alt={image.gallery_name} 
                                style={{ objectFit: 'cover', height: '100px' }} 
                            />
                            <div className="card-body py-1">
                                <div className="card-title small text-truncate">{image.gallery_name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ImageViewModal />
        </div>
    );
};

export default GalleryPanel;
