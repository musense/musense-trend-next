import { useCallback, useEffect, useRef } from 'react';
import styles from './css/headerScrollLink.module.css'
import Link from 'next/link';
const navMap = new Map([
  ['about', {
    name: {
      en: 'About',
      ch: '關於陌聲',
    },
  }],
  ['contact', {
    name: {
      en: 'Contact Us',
      ch: '聯絡我們',
    },
  }],
  ['contactUs', {
    name: {
      en: null,
      ch: null,
    },
  }],
  ['service', {
    name: {
      en: 'Service',
      ch: '服務項目',
    },
  }],
  ['marketing', {
    name: {
      en: 'Marketing',
      ch: '行銷趨勢',
    },
  }],
])

export default function HeaderScrollLink({
  currentId,
  className,
  name,
  offset,
  to,
  disableScroll = false,
  callbackHandler = null
}) {

  // console.log("🚀 ~ file: HeaderScrollLink.jsx:39 ~ scrollHandler ~ callback:", callbackHandler)
  const targetRef = useRef(null)
  const scrollHandler = useCallback(() => {
    window.scrollTo({
      top: targetRef.current + offset,
      behavior: 'smooth',
    })
    callbackHandler && callbackHandler()

  }, [callbackHandler]);

  const target = (document, to) => {
    return new Promise((res, rej) => {
      let times = 0,
        target;
      const interval = setInterval(() => {
        times++
        target = document.getElementById(to)
        if (target) {
          clearInterval(interval)
          res(target)
        } else {
          // console.log("🚀 ~ file: HeaderScrollLink.jsx:75 ~ interval ~ target not found, trial times:", times)
          if (times > 10) {
            clearInterval(interval)
            rej(null)
          }
        }
      }, 10)
    })
  }
  useEffect(() => {
    if (!disableScroll) {
      // scroll button
      let btn;
      console.log("🚀 ~ file: HeaderScrollLink.jsx:64 ~ useEffect ~ to:", to)

      target(document, to)
        .then(res => {
          if (res) {
            console.log("🚀 ~ file: HeaderScrollLink.jsx:85 ~ useEffect ~ res:", res)
            const { top } = res.getBoundingClientRect()
            targetRef.current = top
            btn = document.getElementById(currentId);
            btn.addEventListener('click', scrollHandler)
          }
        });

      const myBtnRef = btn
      return () => {
        myBtnRef && myBtnRef.removeEventListener('click', scrollHandler)
      }
    }
  }, [targetRef, disableScroll]);
  const color = name === 'marketing' ? 'blue' : 'orange'
  const mainClassName = className ? className : styles['nav-button']
  return disableScroll
    ? (<Link
      id={currentId}
      href={to}
      title={name}
      className={mainClassName} >
      <div className={`${styles['bubble']} ${styles[color]}`} />
      <div className={styles['nav-text-wrapper']}>
        <div>{navMap.get(name).name.en}</div>
        <div>{navMap.get(name).name.ch}</div>
      </div>
    </Link>)
    : (
      <div
        id={currentId}
        title={name}
        className={mainClassName} >
        <div className={`${styles['bubble']} ${styles[color]}`} />
        <div className={styles['nav-text-wrapper']}>
          <div>{navMap.get(name).name.en}</div>
          <div>{navMap.get(name).name.ch}</div>
        </div>
      </div >
    )
}
