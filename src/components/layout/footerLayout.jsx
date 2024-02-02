import Logo from './logo';
import usePathname from '@services/usePathname';
import Link from 'next/link';

export default function FooterLayout() {

  const pathname = usePathname()
  const footerClassName = pathname === '/' ? 'index-footer' : ''
  return (
    <footer className={`footer-wrapper ${footerClassName}`}>
      <div className='footer-box'>
        <div className='left-side'>
          <Logo position='footer' color='white' />
          <span>聯絡電話：(04)2201-0520</span>
          <span>營業時間：周一至周五 9:00~18:00</span>
          <span>服務地址：403518臺中市西區英才路530號23樓之5</span>
          <span>E-mail：service@musense.tw</span>
        </div>
        <div className='right-side'>
          <div className='button-box'>
            <div className='contact-us-btn' >
              聯絡我們
            </div>
            <div className='social-btn-box'>
              <Link title='musense facebook' href='https://www.facebook.com/musense.marketing' target='_blank' className='fb-icon' ></Link>
              <Link title='musense instagram' href='https://www.instagram.com/musense.marketing/' target='_blank' className='ig-icon' ></Link>
              {/* <div className={'mail-icon' /> */}
            </div>
          </div>
          <span className='copyright'>
            Copyright ©  陌聲行銷有限公司.<br /> All Rights Reserved.Design by 陌聲行銷
          </span>
        </div>
      </div>
    </footer>
  );
}
