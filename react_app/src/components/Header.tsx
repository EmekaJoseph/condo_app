import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import ThemeToggler from '@/components/ThemeToggler';
import SearchDeceasedModal from '@/components/modals/SearchDeceasedModal';

const Header = () => {
    const { toggleSearchModal } = useAppStore();
    const location = useLocation();
    
    // Scroll handling
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const customClass = scrollY > 50 
        ? 'animate__animated animate__slideInDown animate__faster bg-white shadow-sm' 
        : '';

    // Active link helper
    const isActive = (path: string) => location.pathname === path ? 'active' : '';

    return (
        <>
            <nav className={`navbar navbar-expand-sm navbar-light fixed-top ${customClass}`}>
                <div className="container">
                    <Link className="navbar-brand" to="/" style={{ fontWeight: 700 }}>
                        <img src="/og-image.png" width="30" alt="" />
                    </Link>
                    {/* Toggler button omitted in Vue code, so omitting here too */}
                    
                    <div className="collapse navbar-collapse" id="collapsibleNavId" style={{ display: 'flex !important' /* Force display if bootstrap collapse hides it improperly without js toggler */ }}> 
                         {/* Note: The vue code uses bootstrap collapse classes but commented out the toggler button. 
                             It seems it expects desktop view mostly or relying on css. 
                             Vue code: <div className="collapse navbar-collapse" id="collapsibleNavId">. 
                             I'll assume bootstrap js handles the collapse class if toggler existed, 
                             but here it is always visible on desktop? 
                             The vue code has `d-lg-none` on the commented toggler.
                             I'll just stick to standard bootstrap.
                         */}
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link text-dark ${isActive('/login')}`} to="/login">Login</Link>
                            </li>
                        </ul>
                        <span className="mx-4">
                            <ThemeToggler />
                        </span>
                        <div onClick={toggleSearchModal} className="cursor-pointer d-none d-md-block">
                            <i className="bi bi-search fs-5"></i>
                        </div>
                    </div>
                </div>
            </nav>
            <SearchDeceasedModal />
        </>
    );
};

export default Header;
