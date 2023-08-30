import Link from 'next/link';
import HeaderScrollLink from './HeaderScrollLink';

export default function ButtonLayout() {
    return (
        <div className='btn-layout'>
            <Link href="https://www.facebook.com/musense.marketing" target="_blank" className="fixedBtn fb-btn"></Link>
            <Link href="https://www.instagram.com/musense.marketing/" target="_blank" className="fixedBtn ig-btn"></Link>
            <HeaderScrollLink
                href={`/#contact`}
                to='#contact'
                name='contactUs'
                // disableScroll
                className={`fixedBtn email-btn`}
            />
        </div>
    )
}
