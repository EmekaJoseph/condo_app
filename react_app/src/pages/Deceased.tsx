import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '@/api';
import useFxn from '@/utils/useFunctions';
import { useAppStore } from '@/store/useAppStore';
import LoadingComponent from '@/components/LoadingComponent';     
import PictureHeader from '@/components/DeceasedView/PictureHeader';
import InfoPanel from '@/components/DeceasedView/InfoPanel';
import CondolencesPanel from '@/components/DeceasedView/CondolencesPanel';
import GalleryPanel from '@/components/DeceasedView/GalleryPanel';
import CondoBtn from '@/components/CondoBtn';
import CondoModal from '@/components/modals/CondoModal';
import SearchDeceasedModal from '@/components/modals/SearchDeceasedModal';

const Deceased = () => {
    const { id } = useParams(); // URL params
    const navigate = useNavigate();
    const { setDeceasedId, toggleSearchModal } = useAppStore();
    
    const [details, setDetails] = useState<any>(null);
    const [condolences, setCondolences] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('condo'); // 'condo', 'info', 'gallery'
    const [audioIsPlaying, setAudioIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        setDeceasedId(id);
        fetchDetails();
        fetchCondolences();
        
        // Cleanup audio on unmount
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [id]);

    // Polling for new condolences
    useEffect(() => {
        const interval = setInterval(() => {
            fetchCondolences();
        }, 10000);
        return () => clearInterval(interval);
    }, [id]);

    const fetchDetails = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.details(id);
            setDetails(data);
            if (!data?.id) {
                useFxn.toast('Sorry, this link is Expired!', 'warning');
                navigate('/');
            }
        } catch (error) {
            // handle error
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCondolences = async () => {
        try {
            const { data } = await api.condolences(id);
            setCondolences(data);
        } catch (error) {
            // ignore
        }
    };

    const playAudio = () => {
        if (audioIsPlaying) return;

        const hostURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'; // Fallback or env
        // Note: Vue code used import.meta.env.VITE_API_URL directly.
        // It had a list of audio files and played them sequentially.
        
        const audioFiles = [
            `${hostURL}/background_hymns/abide-with-me.mp3`,
            `${hostURL}/background_hymns/pass-me-not.mp3`,
            `${hostURL}/background_hymns/nearer-my-god.mp3`,
        ];

        let currentIndex = 0;
        const audio = new Audio(audioFiles[currentIndex]);
        audio.volume = 0.5;
        audioRef.current = audio;

        const playNextAudio = () => {
            currentIndex++;
            if (currentIndex < audioFiles.length) {
                audio.src = audioFiles[currentIndex];
                audio.play();
            } else {
                setAudioIsPlaying(false);
            }
        };

        audio.addEventListener('ended', playNextAudio);
        
        audio.play().then(() => {
            setAudioIsPlaying(true);
        }).catch(err => console.log("Audio play failed (interaction needed?):", err));
    };

    const switchTab = (tab: string) => {
        setActiveTab(tab);
        if (tab === 'condo' && !audioIsPlaying) {
             playAudio();
        }
    };

    if (isLoading && !details) return <LoadingComponent />;

    if (!details) return null; // Or some empty state

    return (
        <div className="mb-5 animate__animated animate__fadeIn">
            <PictureHeader details={details} />
            <div className="container" style={{ marginTop: '70px' }}>
                <div className="row g-3">
                    <div className="col-md-8">
                         {/* Nav tabs */}
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'condo' ? 'active' : ''}`}
                                    onClick={() => switchTab('condo')}
                                    style={{ 
                                        color: activeTab === 'condo' ? 'var(--theme-color)' : 'var(--bs-gray-500)',
                                        borderBottom: activeTab === 'condo' ? '2px solid var(--theme-color)' : 'none',
                                        background: 'transparent'
                                    }}
                                >
                                    <i className="bi bi-journal-text me-1"></i> Condolences
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'info' ? 'active' : ''}`} 
                                    onClick={() => switchTab('info')}
                                    style={{ 
                                        color: activeTab === 'info' ? 'var(--theme-color)' : 'var(--bs-gray-500)',
                                        borderBottom: activeTab === 'info' ? '2px solid var(--theme-color)' : 'none',
                                        background: 'transparent'
                                    }}
                                >
                                    <i className="bi bi-info-circle me-1"></i> Info
                                </button>
                            </li>
                             {details.gallery?.length > 0 && (
                                <li className="nav-item" role="presentation">
                                    <button 
                                        className={`nav-link ${activeTab === 'gallery' ? 'active' : ''}`} 
                                        onClick={() => switchTab('gallery')}
                                         style={{ 
                                            color: activeTab === 'gallery' ? 'var(--theme-color)' : 'var(--bs-gray-500)',
                                            borderBottom: activeTab === 'gallery' ? '2px solid var(--theme-color)' : 'none',
                                            background: 'transparent'
                                        }}
                                    >
                                        <i className="bi bi-camera me-1"></i> Gallery
                                    </button>
                                </li>
                             )}
                        </ul>

                        {/* Tab panes */}
                        <div className="tab-content pt-4" style={{ minHeight: '50vh' }}>
                            {activeTab === 'info' && <InfoPanel details={details} />}
                            {activeTab === 'condo' && <CondolencesPanel condolences={condolences} />}
                            {activeTab === 'gallery' && <GalleryPanel gallery={details.gallery} />}
                        </div>
                    </div>

                    <div className="col-md-4">
                        <hr className="d-lg-none" />
                        <div className="row g-3 mt-5 mt-lg-0">
                            <div className="col-12">
                                <div className="card bg-secondary-subtle">
                                    <div className="card-body">
                                        <p className="card-text">
                                            <span className="fs-5 fw-bold">Lost a loved one?</span> <br />
                                            Share memories, photos and videos and create a beautiful and lasting tribute to celebrate the life of your lost loved ones.
                                        </p>
                                        <p>
                                            <i className="bi bi-1-circle-fill me-2"></i>
                                            Fill out the personal details of your lost one and add a short description with preffered background music.
                                        </p>
                                        <p>
                                            <i className="bi bi-2-circle-fill me-2"></i>
                                            Select a nice photo and generate a unique web address for your page.
                                        </p>
                                        <p>
                                            <i className="bi bi-3-circle-fill me-2"></i>
                                            Invite people to share memories and condolence messages.
                                        </p>
                                        <div className="card-footer border-0 bg-transparent px-0">
                                            <Link className="btn btn-theme w-100" to="/login">
                                                Create a memorial page <i className="bi bi-chevron-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button onClick={toggleSearchModal} className="w-100 btn btn-theme-outline">
                                    <i className="bi bi-search"></i> Search memorial
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-12" style={{ marginTop: '130px' }}>
                        <div className="card bg-secondary-subtle">
                            <div className="card-body">
                                <div className="card-text">
                                    🌹 As we mourn the physical departure, we also celebrate the enduring spirit that transcends
                                    the boundaries of time. For in every cherished memory, every shared laugh, and every
                                    lesson learned, the essence of the departed lives on. It resides in the stories told, the
                                    values instilled, and the love that continues to reverberate through the lives touched.
                                </div>
                                <p className="mt-3">
                                    <Link className="theme-color text-decoration-none fw-bold" to="/">
                                        Go To Home Page <i className="bi bi-chevron-right"></i>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {activeTab === 'condo' && <CondoBtn />}
            <CondoModal onHasPosted={fetchCondolences} />
            <SearchDeceasedModal /> 
            {/* SearchDeceasedModal is already imported and used. Should verify its implementation handled isOpen store check */}
        </div>
    );
};

export default Deceased;
