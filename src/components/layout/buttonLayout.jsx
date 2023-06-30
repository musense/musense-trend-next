import Link from 'next/link';
import HeaderScrollLink from './HeaderScrollLink';

export default function ButtonLayout({ path }) {
    // console.log("🚀 ~ file: buttonLayout.jsx:4 ~ ButtonLayout ~ path:", path)
    const disable = path === '/' ? false : true
    return (
        <div className='btn-wrapper'>
            <Link href="https://www.facebook.com/musense.marketing" target="_blank" className="fixedBtn fb-btn"></Link>
            <Link href="https://www.instagram.com/musense.marketing/" target="_blank" className="fixedBtn ig-btn"></Link>
            <HeaderScrollLink
                currentId="fixed-contactUs"
                offset={-100}
                className={`fixedBtn email-btn`}
                to={disable ? '/' : 'contact'}
                name='contactUs'
                disableScroll={disable}
            />
        </div>
    )
}
