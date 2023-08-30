import React, { useCallback, useEffect, useRef } from 'react'
import useWaitState from '@services/useWaitState'
import { useAppContext } from "@store/context";

export default function NavBackDrop({ unCheck }) {
  const { state } = useAppContext();
  const navBackdropRef = useRef(null);

  const prevState = useWaitState(state.menuOpen)

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
