import { useEffect } from 'react';

export default function useRefresh() {
    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }, []);
}
