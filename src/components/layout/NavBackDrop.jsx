import React, { useCallback, useEffect, useRef } from 'react'
import useWaitState from '@services/useWaitState'

export default function NavBackDrop({ active, unCheck }) {

  const navBackdropRef = useRef(null);

  const prevState = useWaitState(active)

  const navBackdropHandler = useCallback((e) => {
    console.log(e.target)
    unCheck && unCheck()
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
  }, [navBackdropRef, navBackdropHandler]);


  return <div
    ref={navBackdropRef}
    id="nav-backdrop"
    className={`${prevState ? 'active' : ''}`}
  />;
}
