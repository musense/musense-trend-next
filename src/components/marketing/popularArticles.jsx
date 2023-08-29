import Link from 'next/link';
import React from 'react';

export default function PopularArticles({ contents }) {
  return contents.length > 0 && <div data-title="熱門文章" className='hot-content-container'>
    <div className='main' />
    <div className='main-en' />
    <div className='hot-content-wrapper'>
      <HotContents contents={contents} />
    </div>
  </div>
}

function HotContents({ contents }) {
  console.log("🚀 ~ file: popularArticles.jsx:15 ~ HotContents ~ contents:", contents)

  const [leftContents, rightContents] = React.useMemo(() => {
    if (!contents || contents.length === 0) return [null, null]
    if (contents.length <= 3) return [[...contents], null]
    return [
      contents.slice(0, 3),
      contents.slice(3, 6)
    ]
  }, [contents]);

  return <>
    <div className='hot-left-side'>
      {leftContents && leftContents.map((content, index) => {
        return <Link key={index} href={`/trend/${content.sitemapUrl}`} className='hot-content'>
          <Content title={content.title} />
        </Link>
      })}
    </div>
    <div className='hot-right-side'>
      {rightContents && rightContents.map((content, index) => {
        return <Link key={index} href={`/trend/${content.sitemapUrl}`} className='hot-content'>
          <Content title={content.title} />
        </Link>
      })}
    </div>
  </>;
}

function Content({ title }) {
  return <span className="ellipsis">{title}</span>
}



