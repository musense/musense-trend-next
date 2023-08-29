import React from 'react';
import styles from './css/ourService.module.css';
import ServiceBox from "./serviceBox";
import WhyMusense from "./whyMusense";
import Image from 'next/image';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";

import { ourService } from "@components/index/images";
import useLoadImage from "@services/useLoadImage";

export default function OurService() {
  const { state, dispatch } = useAppContext();
  useInitial({
    state,
    dispatch
  });

  const ourServiceImage = useLoadImage(ourService);
  return (
    <div id='service' className={styles['our-service-wrapper']}>
      {ourServiceImage && <Image
        alt=""
        src={ourServiceImage.default.src}
        width={ourServiceImage.default.width}
        height={ourServiceImage.default.height}
        style={{
          width: '100%',
          objectFit: 'contain'
        }}
      />}
      <ServiceBox />
    </div>
  );
}