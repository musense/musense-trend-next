import React, { useEffect, useState } from 'react';
import styles from './css/ourService.module.css';
import ServiceBox from "./serviceBox";
import WhyMusense from "./whyMusense";
import Image from 'next/image';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";

// import ourService from "@assets/index/ourService.webp";
import { ourService } from "@components/index/images";


export default function OurService({ apiUrl }) {
  const { state, dispatch } = useAppContext();
  useInitial({
    state,
    dispatch
  });

  const [ourServiceImage, setOurServiceImage] = useState(null);
  useEffect(() => {
    const clientWidth = window.innerWidth;
    let ourServiceImport
    if (clientWidth > 768) {
      ourServiceImport = ourService.get('pc')
    } else {
      ourServiceImport = ourService.get('mobile')
    }
    ourServiceImport.then(res => setOurServiceImage({ default: res.default }))
  }, []);
  return (
    <div className={styles['our-service-wrapper']}>
      {ourServiceImage && <Image
        id='service'
        alt=""
        className={styles['our-service']}
        src={ourServiceImage.default.src}
        width={ourServiceImage.default.width}
        height={ourServiceImage.default.height}
        style={{
          width: '100%',
          objectFit: 'contain'
        }}
      />}
      <ServiceBox apiUrl={apiUrl} />

      <WhyMusense />
    </div>
  );
}