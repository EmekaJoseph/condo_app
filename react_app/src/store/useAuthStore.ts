import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
    token: string;
    profileData: any;
    isLoggedIn: () => boolean;
    login: (tokenStr: string) => void;
    logout: () => void;
    setProfileData: (data: any) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: '',
    profileData: null,

    isLoggedIn: () => {
        return !!(get().token || Cookies.get('condonote_tokn'));
    },

    login: (tokenStr: string) => {
        Cookies.set('condonote_tokn', tokenStr, { expires: 7 });
        set({ token: tokenStr });
    },

    setProfileData: (data: any) => set({ profileData: data }),

    logout: () => {
        Cookies.remove('condonote_tokn');
        set({ token: '' });
        window.location.reload();
    },
}));
