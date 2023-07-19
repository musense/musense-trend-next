import React, { useCallback, useEffect, useRef } from 'react'
import HeaderScrollLink from './HeaderScrollLink';

export default function NavWrapper({
  active,
  pathname,
  unCheck,
  headerForceHide = null
}) {
  const navRef = useRef(null);

  const navHandler = useCallback((e) => {
    console.log(e.type)
    e.preventDefault()
  }, [])
  const liHandler = (e) => {
    console.log(e);
    e.stopPropagation()
  }

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
  }, [navRef, pathname, navHandler]);

  const callbackHandler = useCallback((e) => {
    unCheck && unCheck()
    headerForceHide && headerForceHide()
  }, [unCheck, headerForceHide])

  return <nav ref={navRef} className={`${active ? 'active' : ''}`}>
    <ul>
      <li>
        <HeaderScrollLink
          to={`${process.env.NEXT_PUBLIC_FRONT_SITE}#about`}
          name='about'
          disableScroll
          callbackHandler={callbackHandler}
        />
      </li>
      <li>
        <HeaderScrollLink
          to={`${process.env.NEXT_PUBLIC_FRONT_SITE}#service`}
          name='service'
          disableScroll
          callbackHandler={callbackHandler}
        />
      </li>
      <li>
        <HeaderScrollLink
          to={`${process.env.NEXT_PUBLIC_FRONT_SITE}#contact`}
          name='contact'
          disableScroll
          callbackHandler={callbackHandler}
        />
      </li>
      <li>
        <HeaderScrollLink
          to='/'
          name='marketing'
          disableScroll
          callbackHandler={callbackHandler}
        />
      </li>
    </ul>
  </nav>;
}
