import logo_white from '@assets/logo/logo_white.webp';
import logo_gray from '@assets/logo/logo_gray.webp';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ color = 'gray', position = "header" }) {
  const logo = color === 'gray' ? logo_gray : logo_white

  return <Link className={`logo ${position}`} href={'/'}>
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
}
