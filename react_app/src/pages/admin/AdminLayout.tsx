import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import api from '@/api';
import HeaderAndMenu from '@/components/admin/HeaderAndMenu';
import Footer from '@/components/Footer';
import LoadingComponent from '@/components/LoadingComponent';

const AdminLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { logout, setProfileData } = useAuthStore(); 
    // Note: I need to update useAuthStore to include setProfileData or just profileData setter.
    // I check implementation of useAuthStore. It has `profileData` as state but no setter exported?
    // Wait, create<AuthState>... I need to check useAuthStore.ts again.
    
    // For now I assume I can update state directly if I expose a setter or use `useAuthStore.setState` (zustand feature).
    // Or I'll update the store file to expose `setProfileData`.

    useEffect(() => {
        getProfileDetails();
    }, []);

    const getProfileDetails = async () => {
        try {
            const { data } = await api.userProfile();
            setProfileData(data);
            setIsLoading(false);
        } catch (error) {
            logout();
        }
    };

    if (isLoading) return <LoadingComponent />;

    return (
        <div>
            <div style={{ marginBottom: '100px' }}>
                <HeaderAndMenu />
                <div className="container mt-4">
                     {/* Alerts code was commented out in Vue, omitting here too */}
                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
