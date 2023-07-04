import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({
  id,
  image,
  content
}) {
  const {
    homeImagePath, tags, createDate, title, altText
  } = content;

  console.log("🚀 ~ file: card.jsx:6 ~ content:", content)
  console.log("🚀 ~ file: card.jsx:6 ~ Card ~ imgSrc:", image)

  // const [cardImage, setCardImage] = useState(null);
  // useEffect(() => {
  //   imgSrc.then(res => setCardImage({ default: res.default }))
  // }, [imgSrc]);
  // console.log("🚀 ~ file: card.jsx:7 ~ Card ~ cardImage:", cardImage)
  const tagNameArray = tags.reduce((acc, curr) => {
    return [...acc, curr.name]

  }, [])
  return (
    <Link
      className='card'
      href={`/${content.sitemapUrl}`}
      // href={`/contents/${id}`}
    >
      <div>
        {homeImagePath && <Image
          className='card-img'
          src={homeImagePath}
          width={300}
          height={300}
          alt={altText || ''}
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        }
        <div className='card-content'>
          <span className='ellipsis'>
            {title}
          </span>
        </div>
        <div className='card-footer'>
          <div className='card-tag'>{tagNameArray.join(' / ')}</div>
          <div className='card-create-date'>{createDate}</div>
        </div>
      </div>
    </Link>
  );
}
