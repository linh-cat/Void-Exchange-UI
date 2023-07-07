import { useEffect, useState } from 'react';

const useScroll = (ref) => {
    const [isScrolling, setIsScrolling] = useState(false);
    console.log({ ref })

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                if (ref.current.scrollTop > 0) {
                    setIsScrolling(true);
                } else {
                    setIsScrolling(false);
                }
            }
        };

        if (ref.current) {
            ref.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (ref.current) {
                ref.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [ref]);

    return isScrolling;
};

export default useScroll;