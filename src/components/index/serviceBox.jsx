import React, { useEffect, useMemo, useState } from 'react'
import styles from './css/serviceBox.module.css';

// import { instance } from "@services/AxiosInstance";
import Link from 'next/link';


const categoryMap = [
  {
    className: 'advertising',
    zn_title: '廣告投放代理',
    en_title: 'Advertising\nAgency',
    content: `數位媒禮採購\n專業廣告投放\n行銷宣傳企劃\n成效執行分析`,
    sitemapUrl: process.env.NEXT_PUBLIC_ADVERTISING
  },
  {
    className: 'seo-service',
    zn_title: 'ＳＥＯ網站優化',
    en_title: 'SEO Service',
    content: `關鍵字佈局分析\n網頁問題診斷\n網站程式優化\n社群串接整合`,
    sitemapUrl: process.env.NEXT_PUBLIC_SEO
  },
  {
    className: 'social-media',
    zn_title: '社群口碑行銷',
    en_title: 'Social Media',
    content: `市場輿情分析\n社群平台代操\n宣傳議題規劃\nＫＯＬ網紅宣傳`,
    sitemapUrl: process.env.NEXT_PUBLIC_SOCIAL_MEDIA
  },
  {
    className: 'cis',
    zn_title: '數位形象設計',
    en_title: 'Digital Image\nDesign',
    content: `品牌視覺設計\nＲＷＤ網頁設計\n平面設計包裝\n行銷宣傳圖像`,
    sitemapUrl: process.env.NEXT_PUBLIC_CIS
  },
]

export default function ServiceBox() {
  const serviceHeader = useMemo(() => {
    return categoryMap.map((category, index) => {
      const url = category ? category.sitemapUrl : '#'
      return <Link
        key={index}
        href={url}
        className={styles[category.className]}
      >
        <div className={styles['service-header']}>
          <div>{category.zn_title}</div>
          <div>{category.en_title}</div>
        </div>
        <div className={styles['service-body']}>
          {category.content}
        </div>
      </Link>;
    });
  }, [])


  return <div className={styles['service-box']}>
    {serviceHeader}
  </div>;
}