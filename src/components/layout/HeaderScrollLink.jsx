import React, { useCallback, useEffect, useRef } from 'react';
import styles from './css/headerScrollLink.module.css'
import Link from 'next/link';
import navMap from './navMap'

const HeaderScrollLink = ({
  offset,
  href = '',
  to,
  name,
  className,
  disableScroll = false,
  callbackHandler = null
}) => {
  const destRef = useRef(null)

  useEffect(() => {
    if (!to) return
    destRef.current = document.querySelector(to)
  }, [to]);

  const scrollHandler = useCallback((e, destObject) => {
    console.log("🚀 ~ file: HeaderScrollLink.jsx:87 ~ scrollHandler ~ destObject:", destObject)
    if (!destObject) return
    if (disableScroll) return
    e.preventDefault()
    const { top: destTop } = destObject.getBoundingClientRect()
    window.scrollBy({
      top: destTop + offset,
      behavior: 'smooth',
    })
    callbackHandler && callbackHandler()

  }, [callbackHandler, offset, disableScroll]);

  const color = name === 'marketing' ? 'blue' : 'orange'
  const mainClassName = className ? className : styles['nav-button']

  return (
    <Link
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
    </Link>
  )
}

export default HeaderScrollLink