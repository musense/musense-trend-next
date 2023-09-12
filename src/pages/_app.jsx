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
      <Script id="fb-script" strategy="lazyOnload">
        {`
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "102981139386541");
            chatbox.setAttribute("attribution", "biz_inbox");
      
            window.fbAsyncInit = function() {
              FB.init({
                xfbml: true,
                version : 'v12.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  );
}
