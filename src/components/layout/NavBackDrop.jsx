import React, { useCallback, useEffect, useRef } from 'react'

export default function NavBackDrop({ active, unCheck }) {

    const navBackdropRef = useRef(null);
  
    const navBackdropHandler = useCallback((e) => {
      console.log(e.target)
      unCheck()
    }, [unCheck])
  
    useEffect(() => {
      if (navBackdropRef.current === null) {
        return
      } else {
        navBackdropRef.current.addEventListener("touchstart", navBackdropHandler)
        navBackdropRef.current.addEventListener("touchend", navBackdropHandler)
        navBackdropRef.current.addEventListener("wheel", navBackdropHandler)
        navBackdropRef.current.addEventListener("scroll", navBackdropHandler)
      }
    }, [navBackdropRef]);
  
  
    return <div ref={navBackdropRef} id="nav-backdrop" className={`${active ? 'active' : ''}`} />;
  }
