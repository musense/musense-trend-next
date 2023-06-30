import React, { useEffect, useMemo, useState } from 'react'
import styles from './css/serviceBox.module.css';

import { instance } from "@services/AxiosInstance";
import Link from 'next/link';


const namesMap = [
  {
    className: 'advertising',
    zn_title: '廣告投放代理',
    en_title: 'Advertising\nAgency',
    content: `數位媒禮採購\n專業廣告投放\n行銷宣傳企劃\n成效執行分析`,
  },
  {
    className: 'seo-service',
    zn_title: 'ＳＥＯ網站優化',
    en_title: 'SEO Service',
    content: `關鍵字佈局分析\n網頁問題診斷\n網站程式優化\n社群串接整合`,
  },
  {
    className: 'social-media',
    zn_title: '社群口碑行銷',
    en_title: 'Social Media',
    content: `市場輿情分析\n社群平台代操\n宣傳議題規劃\nＫＯＬ網紅宣傳`,
  },
  {
    className: 'cis',
    zn_title: '數位形象設計',
    en_title: 'Digital Image\nDesign',
    content: `品牌視覺設計\nＲＷＤ網頁設計\n平面設計包裝\n行銷宣傳圖像`,
  },
]

export default function ServiceBox({ apiUrl }) {


  const [item, setItem] = useState(null);
  async function getTitleContentsByCategoryAsync() {
    const res = await instance(apiUrl).get(`/categories`)
      .then(res => res.data)
    const { data, totalCount, totalPages } = res;
    // console.table(data)
    // console.log("🚀 ~ file: serviceBox.jsx:18 ~ getTitleContentsByCategoryAsync ~ totalCount:", totalCount)
    // console.log("🚀 ~ file: serviceBox.jsx:18 ~ getTitleContentsByCategoryAsync ~ totalPages:", totalPages)

    setItem(data)
  }

  useEffect(() => {
    getTitleContentsByCategoryAsync()
  }, []);


  const serviceHeader = useMemo(() => {
    // if (!item) return
    return namesMap.map((name, index) => {
      const serviceItem = item && item.find(item => item.keyName === name.en_title.replace(/\n/g, ' '))
      const url = serviceItem
        ? serviceItem.originalUrl
          ? serviceItem.originalUrl
          : serviceItem.sitemapUrl
        : ''
      console.log("🚀 ~ file: serviceBox.jsx:55 ~ serviceHeader ~ serviceItem:", serviceItem)
      return <Link href={url} key={index} className={styles[name.className]}>
        <div className={styles['service-header']}>
          <div>{name.zn_title}</div>
          <div>{name.en_title}</div>
        </div>
        <div className={styles['service-body']}>
          {name.content}
        </div>
      </Link>;
    });
  }, [item])


  return <div className={styles['service-box']}>
    {serviceHeader}
  </div>;
}