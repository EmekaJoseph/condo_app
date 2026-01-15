import { useAppStore } from '@/store/useAppStore';

const ThemeToggler = () => {
    const { appTheme, toggleTheme } = useAppStore();

    return (
        <span onClick={toggleTheme} className="cursor-pointer">
            {appTheme === 'dark' ? (
                <i className="bi bi-sun"></i>
            ) : (
                <i className="bi bi-moon"></i>
            )}
        </span>
    );
};

export default ThemeToggler;
