
import { useEffect, useState, useRef } from 'react';

export default function usePathname() {
    const mountRef = useRef(null)
    const [clientPath, setClientPath] = useState(undefined);
    useEffect(() => {
        if (mountRef.current === null) {
            mountRef.current = true
            let pathname = window.location.pathname
            setClientPath(pathname)
        }
    }, [mountRef]);
    return clientPath
}



