import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import ThemeToggler from '@/components/ThemeToggler';
import api from '@/api';
import { Dropdown } from 'react-bootstrap';

const HeaderAndMenu = () => {
    const { appName } = useAppStore();
    const { profileData, logout: storeLogout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Route name mapping (simplified)
    const getRouteName = () => {
        const path = location.pathname;
        if (path.includes('dashboard')) return 'Dashboard';
        if (path.includes('profile')) return 'Profile';
        return 'Admin';
    };

    const handleLogout = async () => {
        try {
            await api.userLogout();
        } catch (error) {
            // ignore
        }
        storeLogout();
        navigate('/login', { replace: true });
    };

    return (
        <nav className="navbar sticky-top navbar-light text-muted bg-secondary-subtle shadow-sm">
            <div className="container">
                <div className="py-2">
                    <span className="theme-color fw-bolder">{appName}</span>
                    &nbsp;| {getRouteName()}
                </div>
                <div className="d-flex gap-4">
                    <span>
                        <ThemeToggler />
                    </span>
                    <Dropdown className="d-none d-md-block">
                        <Dropdown.Toggle as="span" className="cursor-pointer" id="dropdown-custom-components">
                             <i className="bi bi-person-circle text-muted"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align="end" className="pt-0 rounded-top-0">
                            <Dropdown.Item disabled>{profileData?.email ?? ''}</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout} className="text-danger">
                                <i className="bi bi-power"></i> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default HeaderAndMenu;
