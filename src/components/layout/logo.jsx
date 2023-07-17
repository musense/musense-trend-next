import logo_white from '@assets/logo/logo_white.webp';
import logo_gray from '@assets/logo/logo_gray.webp';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useWaitState from '@services/useWaitState'

export default function Logo({ active, color = 'gray', position = "header" }) {

  const logo = color === 'gray' ? logo_gray : logo_white

  const prevState = useWaitState(active)

  return prevState ?
    (
      <div className={`logo ${position}`}>
        <Image
          title="Musense Marketing"
          src={logo.src}
          alt="Musense Marketing"
          width={logo.width}
          height={logo.height}
          style={{
            width: '100%',
            maxWidth: '27rem',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    ) :
    (
      <Link className={`logo ${position}`}
        href={process.env.NEXT_PUBLIC_FRONT_SITE}>
        <div>
          <Image
            title="Musense Marketing"
            src={logo.src}
            alt="Musense Marketing"
            width={logo.width}
            height={logo.height}
            style={{
              width: '100%',
              maxWidth: '27rem',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </Link>
    )
}
