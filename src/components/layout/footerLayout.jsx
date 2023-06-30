import Logo from './logo';
import styles from './css/footerLayout.module.css';
import usePathname from './hook/usePathname';
import Link from 'next/link';

export default function FooterLayout() {

  const pathname = usePathname()
  return (
    pathname !== undefined &&
    <footer className={`${styles['footer-wrapper']} ${styles[pathname.replaceAll('/', '').replace(/[1-9]/g, '').toLowerCase()]}`}>
      <div className={styles['footer-box']}>
        <div className={styles['left-side']}>
          <Logo position={'footer'} color={'white'} />
          <span>聯絡電話：(04)2201-0520</span>
          <span>營業時間：周一至周五 9:00~18:00</span>
          <span>服務地址：403台中市西區台灣大道二段二號四樓之一</span>
          <span>E-mail：service@musense.tw</span>
        </div>
        <div className={styles['right-side']}>
          <div className={styles['button-box']}>
            <div className={styles['contact-us-btn']} >
              聯絡我們
            </div>
            <div className={styles['social-btn-box']}>
              <Link title='musense facebook' href='https://www.facebook.com/musense.marketing' target='_blank' className={styles['fb-icon']} ></Link>
              <Link title='musense instagram' href='https://www.instagram.com/musense.marketing/' target='_blank' className={styles['ig-icon']} ></Link>
              {/* <div className={styles['mail-icon' /> */}
            </div>
          </div>
          <span className={styles['copyright']}>
              Copyright ©  陌聲行銷有限公司.<br /> All Rights Reserved.Design by 陌聲行銷
          </span>
        </div>
      </div>
    </footer>
  );
}
