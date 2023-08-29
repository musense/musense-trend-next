import React, { useCallback, useEffect, useRef } from 'react';
import styles from './css/headerScrollLink.module.css'
import Link from 'next/link';
import navMap from './navMap'

const HeaderScrollLink = React.forwardRef(({
  offset,
  href = '',
  to,
  name,
  className,
  disableScroll = false,
  callbackHandler = null
}, ref) => {
  const destRef = useRef(null)

  const scrollHandler = useCallback((e, destObject) => {
    console.log("🚀 ~ file: HeaderScrollLink.jsx:87 ~ scrollHandler ~ destObject:", destObject)
    if (!destObject) return
    if (!disableScroll) {
      e.preventDefault()
      const { top: destTop } = destObject && destObject.getBoundingClientRect()
      window.scrollBy({
        top: destTop + offset,
        behavior: 'smooth',
      })
      callbackHandler && callbackHandler()
    }
  }, [callbackHandler, offset, disableScroll]);

  useEffect(() => {
    if (!disableScroll) {

      destRef.current = document.querySelector(to)
      if (((!ref || !ref.current) || !destRef.current)) {
        return
      } else {
        ref.current.addEventListener('click', scrollHandler)
      }
      const myLinkRef = ref.current
      return () => {
        myLinkRef && myLinkRef.removeEventListener('click', scrollHandler)
      }
    }
  }, [ref, destRef, offset, disableScroll, scrollHandler, to]);

  const color = name === 'marketing' ? 'blue' : 'orange'
  const mainClassName = className ? className : styles['nav-button']

  return (<Link
    ref={ref}
    alt={name}
    title={navMap.get(name).name.ch}
    onClick={(e) => scrollHandler(e, destRef.current)}
    href={href}
    className={mainClassName}
  >
    <div className={`${styles['bubble']} ${styles[color]}`} />
    <div className={styles['nav-text-wrapper']}>
      <div>{navMap.get(name).name.en}</div>
      <div>{navMap.get(name).name.ch}</div>
    </div>
  </Link>)
})

HeaderScrollLink.displayName = 'HeaderScrollLink'

export default HeaderScrollLink