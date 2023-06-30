import React, { useEffect, useMemo, useState } from 'react';
import styles from './css/about.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";

import {
  bg,
  welcome,
  top,
  musenseCanHelp,
  reply,
  triangleBox,
  triangleRangeOrange_right,
  triangleRangeOrange_left
} from "@components/index/images";

export default function About() {
  const { state, dispatch } = useAppContext();
  useInitial({
    state,
    dispatch
  });

  const [backgroundImage, setBackgroundImage] = useState(null);
  const [welcomeImage, setWelcomeImage] = useState(null);
  const [musenseCanHelpImage, setMusenseCanHelpImage] = useState(null);
  const [topImage, setTopImage] = useState(null);
  const [replyImage, setReplyImage] = useState(null);
  const [triangleBoxImage, setTriangleBoxImage] = useState(null);
  const [triangleRangeOrangeRightImage, setTriangleRangeOrangeRightImage] = useState(null);
  const [triangleRangeOrangeLeftImage, setTriangleRangeOrangeLeftImage] = useState(null);

  useEffect(() => {
    const clientWidth = state.clientWidth;

    let bgImport,
      welcomeImport,
      musenseCanHelpImport,
      topImport,
      replyImport,
      trBImport,
      troRImport,
      troLImport
    if (!clientWidth) return
    if (clientWidth > 768) {
      bgImport = bg.get('pc')
      welcomeImport = welcome.get('pc')
      musenseCanHelpImport = musenseCanHelp.get('pc')
      topImport = top.get('pc')
      replyImport = reply.get('pc')
      trBImport = triangleBox.get('pc')
      troRImport = triangleRangeOrange_right.get('pc')
      troLImport = triangleRangeOrange_left.get('pc')
    } else {
      bgImport = bg.get('mobile')
      welcomeImport = welcome.get('mobile')
      musenseCanHelpImport = musenseCanHelp.get('mobile')
      topImport = top.get('mobile')
      replyImport = reply.get('mobile')
      trBImport = triangleBox.get('mobile')
      troRImport = triangleRangeOrange_right.get('mobile')
      troLImport = triangleRangeOrange_left.get('mobile')
    }
    bgImport.then(res => setBackgroundImage({ default: res.default }))
    welcomeImport.then(res => setWelcomeImage({ default: res.default }))
    musenseCanHelpImport.then(res => {
      if (!res.after) {
        setMusenseCanHelpImage({
          default: res.default,
          after: null
        })
      } else {
        const defaultImport = res.default
        const afterImport = res.after
        Promise.all([defaultImport, afterImport]).then(res => {
          console.log("🚀 ~ file: about.jsx:63 ~ Promise.all ~ res:", res)
          setMusenseCanHelpImage({
            default: res[0].default,
            after: res[1].default,
          })
        })
      }

    })
    topImport.then(res => { setTopImage({ default: res.default }) })
    replyImport.then(res => {
      if (!res.after) {
        setReplyImage({
          default: res.default,
          before: null,
          after: null,
        })
      } else {
        const defaultImport = res.default
        const afterImport = res.after
        const beforeImport = res.before
        Promise.all([defaultImport, afterImport, beforeImport]).then(res => {
          console.log("🚀 ~ file: about.jsx:63 ~ Promise.all ~ res:", res)
          setReplyImage({
            default: res[0].default,
            after: res[1].default,
            before: res[2].default,
          })
        })
      }
    })
    trBImport.then(res => { setTriangleBoxImage({ default: res.default }) })
    troRImport.then(res => { setTriangleRangeOrangeRightImage({ default: res.default }) })
    troLImport.then(res => { setTriangleRangeOrangeLeftImage({ default: res.default }) })
  }, [state.clientWidth]);

  console.log("🚀 ~ file: about.jsx:36 ~ backgroundImage ~ backgroundImage:", backgroundImage)
  console.log("🚀 ~ file: about.jsx:41 ~ About ~ musenseCanHelpImage:", musenseCanHelpImage)
  useEffect(() => {

    AOS.init({
      offset: 120,
      delay: 50, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms);
      easing: 'ease-in-out',
    });
  }, []);


  return (
    <div className={styles['about-us']}>
      {backgroundImage && <Image
        alt=""
        className={styles['bg']}
        placeholder='blur'
        blurDataURL={backgroundImage.default.blurDataURL}
        src={backgroundImage.default.src}
        width={backgroundImage.default.width}
        height={backgroundImage.default.height} />}
      <div id='about' className={styles['about-box']}>
        <div className={styles['slogan']} >
          <div className={styles['text-zhtw']}>傾聽陌聲、傳遞陌生</div>
          <div className={styles['text-en']}>We listen. We care. We transmit.</div>
        </div>
        {topImage && <Image
          alt=""
          className={styles['top-image']}
          src={topImage.default.src}
          width={topImage.default.width}
          height={topImage.default.height} />}
      </div>

      {welcomeImage && <Image
        alt=""
        className={styles['welcome']}
        src={welcomeImage.default.src}
        width={welcomeImage.default.width}
        height={welcomeImage.default.height}
        style={{
          // width: '100%',
          objectFit: 'contain'
        }}
      />}

      <BubbleBox />

      <BubbleBoxMobile />

      {musenseCanHelpImage
        ? musenseCanHelpImage.after
          ? (
            <>
              <Image
                alt=""
                className={styles['musense-can-help']}
                src={musenseCanHelpImage.after.src}
                width={musenseCanHelpImage.after.width}
                height={musenseCanHelpImage.after.height}
                style={{
                  marginTop: '1rem',
                  width: '16rem',
                  height: '1.5rem',
                  width: '100%',
                  objectFit: 'contain'
                }} />
              <Image
                alt=""
                className={styles['musense-can-help']}
                src={musenseCanHelpImage.default.src}
                width={musenseCanHelpImage.default.width}
                height={musenseCanHelpImage.default.height}
                style={{
                  width: '100%',
                  objectFit: 'contain'
                }} />
            </>
          )
          : (
            <>
              <Image
                alt=""
                className={styles['musense-can-help']}
                src={musenseCanHelpImage.default.src}
                width={musenseCanHelpImage.default.width}
                height={musenseCanHelpImage.default.height}
                style={{
                  marginTop: '190px',
                  width: '100%',
                  objectFit: 'contain'
                }} />
            </>
          )
        : null
      }

      {replyImage
        ? replyImage.before
          ? (
            <>
              <Image
                alt=""
                src={replyImage.before.src}
                width={replyImage.before.width}
                height={replyImage.before.height}
                style={{
                  marginTop: '1rem',
                  width: '11rem',
                  height: '3rem',
                  width: '100%',
                  objectFit: 'contain'
                }}
              />
              <Image
                alt=""
                src={replyImage.default.src}
                width={replyImage.default.width}
                height={replyImage.default.height}
                style={{
                  width: 'calc(100% - 4rem)',
                  objectFit: 'contain',
                  margin: '2rem 2rem 0',
                  height: '2rem',
                }}
              />
              <Image
                alt=""
                src={replyImage.after.src}
                width={replyImage.after.width}
                height={replyImage.after.height}
                style={{
                  margin: '0 2.5rem',
                  width: 'calc(100% - 5rem)',
                  objectFit: 'contain',
                  height: '1.5rem',
                }}
              />
            </>
          )
          : (
            <>
              <Image
                alt=""
                src={replyImage.default.src}
                width={replyImage.default.width}
                height={replyImage.default.height}
                style={{
                  marginTop: '3rem',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            </>
          )
        : null
      }
      {triangleBoxImage && <Image
        alt=""
        className={styles['triangle-box-blue']}
        src={triangleBoxImage.default.src}
        width={triangleBoxImage.default.width}
        height={triangleBoxImage.default.height}
        style={{
          height: '14rem',
          width: '100%',
          objectFit: 'contain'
        }}
      />
      }
      <div className={styles['triangle-box']}>
        {triangleRangeOrangeRightImage && <Image
          alt=""
          className={styles['triangle-range-orange-right']}
          src={triangleRangeOrangeRightImage.default.src}
          width={triangleRangeOrangeRightImage.default.width}
          height={triangleRangeOrangeRightImage.default.height} />}
        {triangleRangeOrangeLeftImage && <Image
          alt=""
          className={styles['triangle-range-orange-left']}
          src={triangleRangeOrangeLeftImage.default.src}
          width={triangleRangeOrangeLeftImage.default.width}
          height={triangleRangeOrangeLeftImage.default.height} />}
      </div>
    </div>
  );
}

function BubbleBoxMobile() {
  return <div className={'bubble-box-mobile'}>
    <div>
      <div
        className={'orange-bubble-product'} >
        要怎麼讓消費者能夠快速地<br />了解我的產品特色？
      </div>
      <div
        className={'orange-bubble-view'}>
        如何在網路上增加瀏覽數，<br />並且讓客人願意付費呢？
      </div>
    </div>
    <div>
      <div
        className={'blue-bubble-seo'} >
        ＳＥＯ是什麼？<br />對我有什麼幫助？
      </div>
      <div
        className={'blue-bubble-time'} >
        為什麼花錢做一堆廣告<br />卻沒有效果？
      </div>
    </div>
  </div>;
}

function BubbleBox() {
  return <div className={'bubble-box'}>
    <div>
      <div
        className={'orange-bubble-left'}
        data-aos='orange-slide-left'
        data-aos-delay='0' >
        如何在網路上增加瀏覽數，<br />並且讓客人願意付費呢？
      </div>
      <div
        className={'orange-bubble-right'}
        data-aos='orange-slide-right'
        data-aos-delay='400' >
        要怎麼讓消費者能夠快速地<br />了解我的產品特色？
      </div>
    </div>
    <div>
      <div
        className={'blue-bubble-left'}
        data-aos='blue-slide-left'
        data-aos-delay='600' >
        ＳＥＯ是什麼？<br />對我有什麼幫助？
      </div>
      <div
        className={'blue-bubble-right'}
        data-aos='blue-slide-right'
        data-aos-delay='1000' >
        為什麼花錢做一堆廣告<br />卻沒有效果？
      </div>
    </div>
  </div>;
}

