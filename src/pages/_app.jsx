import { Context } from '@store/context';
import '@styles/global.css';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=GTM-PQVK3G7'
        strategy='afterInteractive'
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
      
            gtag('config', 'GTM-PQVK3G7');
        `}
      </Script>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  );
}
