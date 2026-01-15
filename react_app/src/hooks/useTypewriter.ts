import { useState, useEffect } from 'react';

export const useTypewriter = (text: string | string[], speed = 50, delay = 2000) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0); // Index of current string in array

    useEffect(() => {
        const strings = Array.isArray(text) ? text : [text];
        const currentString = strings[index % strings.length];

        const handleType = () => {
            if (isDeleting) {
                setDisplayedText(prev => prev.substring(0, prev.length - 1));
            } else {
                setDisplayedText(prev => currentString.substring(0, prev.length + 1));
            }

            if (!isDeleting && displayedText === currentString) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && displayedText === '') {
                setIsDeleting(false);
                setIndex(prev => prev + 1);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, index, text, speed, delay]);

    return displayedText;
};
