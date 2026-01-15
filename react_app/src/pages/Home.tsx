import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useAppStore } from '@/store/useAppStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import api from '@/api';
import useFxn from '@/utils/useFunctions';
import { useTypewriter } from '@/hooks/useTypewriter';

const Home = () => {
    const { toggleSearchModal } = useAppStore();
    const navigate = useNavigate();
    const [recents, setRecents] = useState<any[]>([]);

    useEffect(() => {
        getRecents();
    }, []);

    const getRecents = async () => {
        try {
            const resp = await api.recents();
            setRecents(resp.data);
        } catch (error) {
            console.error(error);
        }
    };

    const steps = [
        {
            icon: 'bi bi-1-circle-fill',
            description: 'Fill out the personal details of your lost one and add a short description with preferred background music.',
        },
        {
            icon: 'bi bi-2-circle-fill',
            description: 'Select a nice photo and generate a unique web address for your page.',
        },
        {
            icon: 'bi bi-3-circle-fill',
            description: 'Invite people to share memories and condolence messages.',
        },
    ];

    const goToDeceasedPage = (slide: any) => {
        const name = slide.deceased.split(' ').join('-');
        navigate(`/condo/${slide.id}/${name}`);
    };
    
    // Typewriter effect
    const titleText = useTypewriter([
        'Online Condolence Register for those we miss.',
        'Share cherished memories and create a beautiful, lasting tribute to celebrate the life of your loved ones who have passed.'
    ]);
    
    // Window width for carousel items (simplified)
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Helper to chunk Recents for carousel slides if we want multi-item view
    // react-responsive-carousel handles items differently. It shows ONE slide at a time by default with children.
    // If we want multiple items per slide, we need to group them.
    // However, react-responsive-carousel has `centerMode` and `centerSlidePercentage`.
    
    const centerSlidePercentage = width > 767 ? 20 : 50; // 5 items vs 2 items approx

    return (
        <>
            <Header />
            <div className="mb-5">
                <div className="hero-main min-vh-100">
                    <div className="everything-center overlay-light">
                        <div className="container text-center">
                            <div className="title-condo my-0 py-0">
                                <span className="typed" style={{ fontSize: width > 767 ? '5rem' : '4rem', fontWeight: 700 }}>
                                    condonote.
                                </span>
                            </div>
                            <div className="text-secondary text-center text-danger-emphasis my-0 py-0 title-text">
                                <span className="typed" style={{ fontSize: width > 767 ? '1.25rem' : '1rem' }}>
                                    {titleText}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="other-section">
                    <section className="fs-4">
                        <div className="container py-5">
                             <div className="row justify-content-center g-3">
                                <div className="fw-bold small">Simple Steps:</div>
                                {steps.map((card, index) => (
                                    <div key={index} className="col-md-6 col-lg-4">
                                        <div className="card h-100 hover-tiltY">
                                            <div className="card-body">
                                                <i className={`${card.icon} fs-4`}></i> <br />
                                                {card.description}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-12 small text-right mt-4">
                                    <Link className="float-end btn-link theme-color text-decoration-none fw-bolder hover-tiltX" to="/login">
                                        Create a memorial page now <i className="bi bi-chevron-right"></i>
                                    </Link>
                                </div>
                             </div>
                        </div>
                    </section>

                    {recents.length > 0 && (
                        <section className="bg-white py-5">
                            <div className="container">
                                <div className="row g-3">
                                    <div className="col-12 text-center mb-3">
                                        <h3 className="fw-bold">Recent Memorials 🕯️</h3>
                                    </div>
                                    
                                    <Carousel 
                                        showArrows={true} 
                                        showStatus={false} 
                                        showThumbs={false} 
                                        infiniteLoop={true}
                                        autoPlay={true}
                                        interval={2000}
                                        centerMode={true}
                                        centerSlidePercentage={centerSlidePercentage}
                                        className="px-4 px-lg-0 pt-3"
                                    >
                                        {recents.map((slide, index) => (
                                            <div key={index} className="px-2 pb-2 h-100">
                                                <div 
                                                    onClick={() => goToDeceasedPage(slide)}
                                                    className="card h-100 shadow-sm cursor-pointer hover-tiltY recent-card"
                                                >
                                                    <div className="card-img-top"
                                                        style={{ 
                                                            backgroundImage: `url(${useFxn.resolvePhotoSrc(slide.display_photo, 'deceased_dps')})`,
                                                            height: '180px',
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center'
                                                        }}
                                                    ></div>
                                                    <div className="card-body">
                                                        <div className="card-title theme-color fw-bolder text-truncate">
                                                            {slide.deceased}
                                                        </div>
                                                        <p className="card-text">
                                                            ({new Date(slide.birth_date).getFullYear()} - {new Date(slide.death_date).getFullYear()})
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </section>
                    )}
                    
                    <section className="pt-5 d-md-none">
                        <div className="container">
                            <div onClick={toggleSearchModal} className="text-center theme-color fs-4 cursor-pointer hover-tiltX">
                                Click here to search <i className="bi bi-search"></i>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;
