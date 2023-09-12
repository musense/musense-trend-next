import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='zh-tw'>
      <Head />
      <body>
        <div id="fb-root" />
        <div id="fb-customer-chat" className="fb-customerchat" />
        <div id="modal-root" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}