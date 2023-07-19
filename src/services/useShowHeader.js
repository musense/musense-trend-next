import { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import useClientWindowWidth from '@services/useClientWindowWidth';
import debounce from '@services/debounce'
export default function useShowHeader() {

    const clientWindowWidth = useClientWindowWidth()

    const headerForceHide = () => {
        forceHideRef.current = true
        setShowHeader(false)
    }
    const headerRestore = () => {
        // console.log('!!!!!!!!!!!!headerRestore scroll end!!!!!!!!!!!!');
        forceHideRef.current = false
    }
    const forceHideRef = useRef(false);
    const [showHeader, setShowHeader] = useState(true);
    
    useEffect(() => {
        window.addEventListener('scroll', debounce(headerRestore))
    }, [])

    useScrollPosition(({ prevPos, currPos }) => {
        // console.group("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ useScrollPosition")
        // console.log("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ currPos:", currPos.y)
        // console.log("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ prevPos:", prevPos.y)
        // console.groupEnd("🚀 ~ file: useShowHeader.jsx:14 ~ useScrollPosition ~ useScrollPosition")

        if (forceHideRef.current) return
        if (clientWindowWidth < 768 && -prevPos.y < 100) return
        const isShow = currPos.y > prevPos.y
        if (isShow !== showHeader) setShowHeader(isShow);
    },
        [showHeader],
        false,
        false,
        100
    );

    return [showHeader, headerForceHide]
}
