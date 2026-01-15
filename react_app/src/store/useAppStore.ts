import { create } from 'zustand';

interface AppState {
    appName: string;
    appTheme: 'dark' | 'light';
    searchModal: boolean;
    condoModal: boolean;
    imageModal: boolean;
    copyLinkModal: boolean;
    adminMenu: boolean;
    currentDeceasedId: any;
    currentImageToShow: any;
    deceasedLinkUrl: string;

    toggleTheme: () => void;
    toggleSearchModal: () => void;
    toggleCondoModal: () => void;
    toggleImageModal: () => void;
    toggleAdminMenu: () => void;
    toggleCopyLinkModal: () => void;
    showDeceasedCopyModal: (deceased: any) => void;
    setImageToShow: (image: any) => void;
    setDeceasedId: (id: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
    appName: 'Condonote',
    appTheme: 'light',
    searchModal: false,
    condoModal: false,
    imageModal: false,
    copyLinkModal: false,
    adminMenu: false,
    currentDeceasedId: '',
    currentImageToShow: '',
    deceasedLinkUrl: '',

    toggleTheme: () => set((state) => ({ appTheme: state.appTheme === 'dark' ? 'light' : 'dark' })),
    toggleSearchModal: () => set((state) => ({ searchModal: !state.searchModal })),
    toggleCondoModal: () => set((state) => ({ condoModal: !state.condoModal })),
    toggleImageModal: () => set((state) => ({ imageModal: !state.imageModal })),
    toggleCopyLinkModal: () => set((state) => ({ copyLinkModal: !state.copyLinkModal })),
    toggleAdminMenu: () => set((state) => ({ adminMenu: !state.adminMenu })),

    showDeceasedCopyModal: (deceased: any) => {
        const url = `https://${window.location.host}/condo/${deceased.id}/${deceased.deceased.replace(/\s+/g, '-')}`;
        set({ deceasedLinkUrl: url, copyLinkModal: true });
    },

    setImageToShow: (image: any) => set({ currentImageToShow: image }),
    setDeceasedId: (id: any) => set({ currentDeceasedId: id }),
}));
