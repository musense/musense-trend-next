import React, { useCallback, useEffect, useRef } from 'react'
import HeaderScrollLink from './HeaderScrollLink';
import { useAppContext } from "@store/context";

export default function NavWrapper({ unCheck }) {
  const { state, dispatch } = useAppContext();

  const navRef = useRef(null);

  const navHandler = useCallback((e) => {
    console.log(e.type)
    e.preventDefault()
  }, [])
  const liHandler = useCallback((e) => {
    console.log(e);
    e.stopPropagation()
  }, [])

  const serviceOffset = state.clientWidth <= 768 ? -80 : -150
  const contactUsOffset = state.clientWidth <= 768 ? -80 : -150

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
  }, [navRef, navHandler, liHandler]);

  return <nav ref={navRef} className={`${state.menuOpen ? 'active' : ''}`}>
    <ul>
      <li>
        <HeaderScrollLink
          offset={-200}
          href={`/#about`}
          to='#about'
          name='about'
          callbackHandler={unCheck} />
      </li>
      <li>
        <HeaderScrollLink
          offset={serviceOffset}
          href={`/#service`}
          to='#service'
          name='service'
          callbackHandler={unCheck} />
      </li>
      <li>
        <HeaderScrollLink
          offset={contactUsOffset}
          href={`/#contact`}
          to='#contact'
          name='contact'
          callbackHandler={unCheck} />
      </li>
      <li>
        <HeaderScrollLink
          offset={0}
          href={'/trend'}
          name='marketing'
          disableScroll
          callbackHandler={unCheck} />
      </li>
    </ul>
  </nav>;
}
