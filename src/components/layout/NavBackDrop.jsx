import React, { useEffect, useRef } from 'react'
import { useAppContext } from "@store/context";

export default function NavBackDrop() {
  const { dispatch } = useAppContext();
  const navBackdropRef = useRef(null);

  useEffect(() => {
    const navBackdropHandler = () => dispatch({ type: 'CLOSE_MENU' })
    if (navBackdropRef.current === null) {
      return
    } else {
      navBackdropRef.current.addEventListener("touchstart", navBackdropHandler)
      navBackdropRef.current.addEventListener("touchend", navBackdropHandler)
      navBackdropRef.current.addEventListener("wheel", navBackdropHandler)
      navBackdropRef.current.addEventListener("scroll", navBackdropHandler)
    }

    const myNavBackdrop = navBackdropRef.current
    return () => {
      myNavBackdrop.removeEventListener("touchstart", navBackdropHandler)
      myNavBackdrop.removeEventListener("touchend", navBackdropHandler)
      myNavBackdrop.removeEventListener("wheel", navBackdropHandler)
      myNavBackdrop.removeEventListener("scroll", navBackdropHandler)
    }
  }, [dispatch, navBackdropRef]);

  return <div ref={navBackdropRef} id="nav-backdrop" />;
}
