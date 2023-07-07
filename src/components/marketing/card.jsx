import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({
  image,
  content
}) {
  const {
    homeImagePath, tags, title, altText
  } = content;


  console.log("🚀 ~ file: card.jsx:6 ~ content:", content)
  console.log("🚀 ~ file: card.jsx:6 ~ Card ~ imgSrc:", image)
  console.log("🚀 ~ file: card.jsx:6 ~ tags:", tags)

  const tagNameArray = tags && tags.reduce((acc, curr) => {
    return [...acc, curr.name]
  }, [])
  return (
    <Link
      className='card'
      href={`/${content.sitemapUrl}`}
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
          {tags && <div className='card-tag'>{tagNameArray.join(' / ')}</div>}
        </div>
      </div>
    </Link>
  );
}
