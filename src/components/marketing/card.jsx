import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Card({ content }) {

  const {
    homeImagePath,
    tags,
    title,
    altText,
    publishedAt,
    sitemapUrl
  } = content;
  console.log("🚀 ~ file: card.jsx:15 ~ Card ~ sitemapUrl:", sitemapUrl)


  const route = {
    pathname: "/trend/[sitemapUrl]",
    query: { sitemapUrl: sitemapUrl },
  }
  const tagNameArray = tags && tags.reduce((acc, curr) => {
    return [...acc, curr.name]
  }, [])
  return (
    <Link
      className='card'
      href={route}
    >
      <div>
        {homeImagePath && <Image
          className='card-img'
          src={homeImagePath}
          width={314}
          height={178}
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
          {tagNameArray && <div className='card-tag'>
            {tagNameArray.map(tag => {
              return <span key={tag}>{`#${tag} `}</span>
            })}
          </div>}
          <div className="content-date-wrapper">
            <span className="content-create-date">
              {`${new Date(publishedAt).toLocaleDateString('en-ZA')}`}
            </span>
          </div>
        </div>
      </div>
    </Link >
  );
}
