import React, { useCallback, useEffect, useRef, useMemo } from 'react'
import HeaderScrollLink from './HeaderScrollLink';
import { useAppContext } from "@store/context";

export default function NavWrapper({ active, pathname, unCheck, headerForceHide = null }) {
  const { state, dispatch } = useAppContext();
  console.log("🚀 ~ file: NavWrapper.jsx:7 ~ NavWrapper ~ state:", state)
  const navRef = useRef(null);

  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const contactRef = useRef(null);
  const marketingRef = useRef(null);

  const navHandler = useCallback((e) => {
    console.log(e.type)
    e.preventDefault()
  }, [])
  const liHandler = (e) => {
    console.log(e);
    e.stopPropagation()
  }

  const serviceOffset = useMemo(() => {
    let offset = -150
    const clientWidth = state.clientWidth
    if (clientWidth <= 768)
      offset = -80
    return offset;
  }, [state.clientWidth])
  const contactUsOffset = useMemo(() => {
    let offset = -150
    const clientWidth = state.clientWidth
    if (clientWidth <= 768)
      offset = -80
    return offset;
  }, [state.clientWidth])
  console.log("🚀 ~ file: NavWrapper.jsx:39 ~ contactUsOffset ~ contactUsOffset:", contactUsOffset)

  useEffect(() => {
    if (navRef.current === null) {
      return
    } else {
      navRef.current.addEventListener("touchstart", navHandler)
      navRef.current.addEventListener("wheel", navHandler)
      navRef.current.addEventListener("scroll", navHandler)
      navRef.current.addEventListener("touchmove", navHandler)
      const liList = navRef.current.querySelectorAll("li")
      liList.forEach(li => {
        li.addEventListener("touchstart", liHandler)
      })
    }
  }, [navRef, navHandler]);

  const callbackHandler = useCallback((e) => {
    unCheck()
    headerForceHide && headerForceHide()
  }, [unCheck, headerForceHide])

  return <nav ref={navRef} className={`${active ? 'active' : ''}`}>
    <ul>
      <li>
        <HeaderScrollLink
          ref={aboutRef}
          offset={-200}
          href={`${process.env.NEXT_PUBLIC_SITE}/#about`}
          to='#about'
          name='about'
          callbackHandler={callbackHandler} />
      </li>
      <li>
        <HeaderScrollLink
          ref={serviceRef}
          offset={serviceOffset}
          href={`${process.env.NEXT_PUBLIC_SITE}/#service`}
          to='#service'
          name='service'
          callbackHandler={callbackHandler} />
      </li>
      <li>
        <HeaderScrollLink
          ref={contactRef}
          offset={contactUsOffset}
          href={`${process.env.NEXT_PUBLIC_SITE}/#contact`}
          to='#contact'
          name='contact'
          callbackHandler={callbackHandler} />
      </li>
      <li>
        <HeaderScrollLink
          ref={marketingRef}
          offset={0}
          href={process.env.NEXT_PUBLIC_TREND_SITE}
          name='marketing'
          disableScroll
          callbackHandler={callbackHandler} />
      </li>
    </ul>
  </nav>;
}
