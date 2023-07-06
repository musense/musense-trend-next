import { useCallback, useEffect, useRef } from 'react';
import styles from './css/headerScrollLink.module.css'
import Link from 'next/link';
import { useAppContext } from "@store/context";
import useInitial from '@services/useInitial';

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
  className,
  name,
  to,
  disableScroll = false,
  callbackHandler = null,
}) {
  const { state, dispatch } = useAppContext();
  useInitial({
    state,
    dispatch
  });
  const linkRef = useRef(null)
  const scrollHandler = useCallback(() => {
    callbackHandler && callbackHandler()
  }, [callbackHandler]);

  useEffect(() => {
    if (!disableScroll) {
      if (!linkRef.current) {
        return
      } else {
        linkRef.current.addEventListener('click', scrollHandler)
      }
      const myBtnRef = linkRef.current
      return () => {
        myBtnRef && myBtnRef.removeEventListener('click', scrollHandler)
      }
    }
  }, [linkRef, disableScroll, scrollHandler, to]);
  const color = name === 'marketing' ? 'blue' : 'orange'
  const mainClassName = className ? className : styles['nav-button']
  const href = state.clientWidth <= 768 ? to.slice(0, to.indexOf('#') + 1) : to
  return <Link
    ref={linkRef}
    title={navMap.get(name).name.ch}
    href={href}
    className={mainClassName}
  >
    <div className={`${styles['bubble']} ${styles[color]}`} />
    <div className={styles['nav-text-wrapper']}>
      <div>{navMap.get(name).name.en}</div>
      <div>{navMap.get(name).name.ch}</div>
    </div>
  </Link>
}
