import styles from './css/logo.module.css';
import logo_white from '@assets/logo/logo_white.webp';
import logo_gray from '@assets/logo/logo_gray.webp';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ active, color = 'gray', position = "header" }) {

  const logo = color === 'gray' ? logo_gray : logo_white

  const [prevState, setPrevState] = useState();
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setPrevState(active)
      }, 500)
    }
  }, [active]);
  return prevState ?
    (
      <div className={`${styles['logo']} ${styles[position]}`}>
        <Image
          title="Musense Marketing"
          src={logo.src}
          alt="Musense Marketing"
          width={logo.width}
          height={logo.height}
          style={{
            width: 'auto',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    ) :
    (
      <Link className={`${styles['logo']} ${styles[position]}`} href="/">
        <div>
          <Image
            title="Musense Marketing"
            src={logo.src}
            alt="Musense Marketing"
            width={logo.width}
            height={logo.height}
            style={{
              width: 'auto',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </Link>
    )
}
