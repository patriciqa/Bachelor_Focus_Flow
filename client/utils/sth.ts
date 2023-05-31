import { useEffect, useState } from 'react';

const VisibleDivId = (): JSX.Element => {
    const [visibleDivId, setVisibleDivId] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = (): void => {
            const divElements = document.getElementsByTagName('div');

            for (let i = 0; i < divElements.length; i++) {
                const divElement = divElements[i];
                const rect = divElement.getBoundingClientRect();

                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setVisibleDivId(divElement.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <>{ visibleDivId } < />;
};

export default VisibleDivId;
