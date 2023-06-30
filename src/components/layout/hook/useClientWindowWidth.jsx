import { useEffect, useRef } from 'react'

export default function useClientWindowWidth() {

    const clientWidthRef = useRef(null)

    useEffect(() => {
        if (clientWidthRef.current == null) {
        clientWidthRef.current = window.innerWidth
        }
    },[clientWidthRef]);
    return clientWidthRef.current
}
