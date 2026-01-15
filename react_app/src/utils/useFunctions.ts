import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const useFxn = {
    isValidEmail: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    isExtension: (fileName: string, requiredFormats: string[]) => {
        const regex = new RegExp('[^.]+$');
        const ext: any = fileName.match(regex);
        const fileExtension = ext[0].toLowerCase();
        return requiredFormats.some(x => x === fileExtension.toLowerCase());
    },

    truncateStr(str: string, num: number) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    },

    toast: (text: string, icon: 'warning' | 'success' | 'error' | 'info') => {
        MySwal.fire({
            toast: true,
            icon: icon as SweetAlertIcon,
            iconColor: icon === 'error' ? '#dc3545' : (icon === 'success' ? '#198754 ' : '#ffc107'),
            text: text,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            padding: 10,
        });
    },

    confirm: (text: string, btnText: string, icon = 'question') => {
        return MySwal.fire({
            text: text,
            icon: icon as SweetAlertIcon,
            iconColor: '#60148f',
            showCancelButton: true,
            confirmButtonText: btnText,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#60148f',
            reverseButtons: true,
            width: '300px',
        });
    },

    confirmDelete: (text: string, btnText: string) => {
        return MySwal.fire({
            text: text,
            icon: 'warning',
            iconColor: '#dc3545',
            showCancelButton: true,
            confirmButtonText: btnText,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#dc3545',
            reverseButtons: true,
            width: '300px',
        });
    },

    addCommas: (numb: number | string) => {
        if (!numb) return '0';
        const str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    },

    isOnline: () => {
        return navigator.onLine; // Basic implementation, not reactive
    },

    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    debounce: <T extends (...args: any[]) => any>(func: T, delay: number) => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        return (...args: Parameters<T>) => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    },

    greet: () => {
        const currentTime = new Date().getHours();
        if (currentTime < 12) {
            return "Good morning";
        } else if (currentTime < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    },

    dateDisplay: (date: Date | string, options?: string) => {
        const d = new Date(date);
        if (options && options === 'm,y') {
            return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    },

    resolvePhotoSrc: (picture: string, folder_name: string) => {
        const hostURL = import.meta.env.VITE_API_URL;
        const folder = `${hostURL}/${folder_name}`;
        return `${folder}/${picture ?? 'default_photo.png'}`;
    },
};

export default useFxn;
