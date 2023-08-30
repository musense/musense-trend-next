import Link from 'next/link';
import HeaderScrollLink from './HeaderScrollLink';
import { useAppContext } from "@store/context";

export default function ButtonLayout() {
    const { state, dispatch } = useAppContext();

    return (
        <div className='btn-wrapper'>
            <Link href="https://www.facebook.com/musense.marketing" target="_blank" className="fixedBtn fb-btn"></Link>
            <Link href="https://www.instagram.com/musense.marketing/" target="_blank" className="fixedBtn ig-btn"></Link>
            <HeaderScrollLink
                href={`/#contact`}
                to='#contact'
                name='contactUs'
                // disableScroll
                className={`fixedBtn email-btn`}
                callbackHandler={() => dispatch({ type: 'CLOSE_MENU' })}
            />
        </div>
    )
}
