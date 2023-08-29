import React from 'react'
import styles from './css/serviceBox.module.css';
import Link from 'next/link';
import categoryMap from './categoryMap'

export default function ServiceBox() {
  const serviceHeader = categoryMap.map((category, index) => {
    return <Link
      data-title="more"
      key={index}
      href={category.sitemapUrl}
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

  return <div className={styles['service-box']}>
    {serviceHeader}
  </div>;
}