import Swal from 'sweetalert2'
//@ts-ignore
// import validator from 'validator';
import { useDateFormat, useOnline } from '@vueuse/core';

type DebounceFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export default {
    // isEmail: (email: string) => {
    //     return validator.isEmail(email)
    // },

    isExtension: (fileName: string, requiredFormats: string[]) => {
        const regex = new RegExp('[^.]+$');
        const ext: any = fileName.match(regex);
        // get the extension
        const fileExtension = ext[0].toLowerCase()
        //make sure the file is a valid  format
        if (!(requiredFormats.some(x => x == fileExtension.toLowerCase()))) return false
        else return true
    },

    truncateStr(str: string, num: number) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    },

    toast: (text: string, icon: any) => {
        // @ts-expect-error
        Swal.fire({
            toast: true,
            icon: `${icon}`,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            padding: 10,
            // iconColor: '#2c3e50',
        })
    },

    toastShort: (text: string) => {
        Swal.fire({
            toast: true,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            padding: 10,
        })
    },

    confirm: (text: string, btnText: string) => {
        return Swal.fire({
            // title: `${title}`,
            text: `${text}`,
            icon: 'question',
            iconColor: '#873A70',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#873A70',
            reverseButtons: true,
            width: '300px',
        })
    },

    confirmDelete: (text: string, btnText: string) => {
        return Swal.fire({
            // title: `${title}`,
            text: `${text}`,
            icon: 'warning',
            iconColor: '#dc3545',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#dc3545',
            reverseButtons: true,
            width: '300px',
        })
    },

    addCommas: (numb: number) => {
        const str = !numb ? ['0'] : numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    },

    isOnline: () => {
        const online = useOnline()
        return online.value;
    },

    capsFirstLetter: (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    },

    debounce: <T extends (...args: any[]) => any>(func: T, delay: number): DebounceFunction<T> => {
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

    dateDisplay: (date: Date, options?: string) => {
        if (options) {
            if (options == 'm,y') {
                const dd = useDateFormat(date, 'MMM, YYYY')
                return dd.value
            }
        }
        const dd = useDateFormat(date, 'MMM D, YYYY')
        return dd.value
    }
}