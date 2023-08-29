import Link from 'next/link';
import HeaderScrollLink from './HeaderScrollLink';

export default function ButtonLayout({ path }) {
    return (
        <div className='btn-wrapper'>
            <Link href="https://www.facebook.com/musense.marketing" target="_blank" className="fixedBtn fb-btn"></Link>
            <Link href="https://www.instagram.com/musense.marketing/" target="_blank" className="fixedBtn ig-btn"></Link>
            <HeaderScrollLink
                to={`${process.env.NEXT_PUBLIC_SITE}#contact`}
                name='contactUs'
                disableScroll
                className={`fixedBtn email-btn`}
            />
        </div>
    )
}
