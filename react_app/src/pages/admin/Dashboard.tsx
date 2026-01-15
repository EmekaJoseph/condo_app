import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import DeceasedPostingTab from './tabs/DeceasedPostingTab';
import HistoryTab from './tabs/HistoryTab';
import UsersTab from './tabs/UsersTab';

type TabTypes = 'history' | 'new_post' | 'users';

const Dashboard = () => {
    const [tabToShow, setTabToShow] = useState<TabTypes>('new_post');
    const { profileData } = useAuthStore();

    const tabs = [
        { name: 'Post Memorial', value: 'new_post', component: <DeceasedPostingTab onDone={() => setTabToShow('history')} />, adminAccess: ['1', '2'] },
        { name: 'Uploads History', value: 'history', component: <HistoryTab />, adminAccess: ['1', '2'] },
        { name: 'Users', value: 'users', component: <UsersTab />, adminAccess: ['1'] },
    ];

    useEffect(() => {
        setTabToShow('new_post');
    }, []);

    return (
        <div className="container mt-5 animate__animated animate__fadeIn">
             <div className="min-vh-100">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {tabs.map(tab => (
                        tab.adminAccess.includes(profileData?.level?.toString() || '') && (
                            <li key={tab.value} className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${tabToShow === tab.value ? 'active' : ''}`}
                                    onClick={() => setTabToShow(tab.value as TabTypes)}
                                    type="button" 
                                    role="tab" 
                                    aria-selected={tabToShow === tab.value}
                                    style={{
                                        color: tabToShow === tab.value ? 'var(--theme-color)' : 'var(--bs-gray-600)',
                                        borderBottom: tabToShow === tab.value ? '1px solid var(--theme-color)' : 'none',
                                        fontWeight: tabToShow === tab.value ? 'bolder' : 'normal',
                                        background: 'transparent'
                                    }}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        )
                    ))}
                </ul>

                <div className="tab-content">
                     {tabs.map(tab => (
                        <div key={tab.value} className={`tab-pane fade ${tabToShow === tab.value ? 'show active' : ''}`} role="tabpanel">
                            {tabToShow === tab.value && tab.component}
                        </div>
                     ))}
                </div>
             </div>
             {/* <deceasedLinkModal /> -- To be implemented */}
        </div>
    );
};

export default Dashboard;
