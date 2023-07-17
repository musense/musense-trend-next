import Link from 'next/link';
import React from 'react';

export default function PopularContent({ contents }) {
  // console.log("🚀 ~ file: hotContent.jsx:5 ~ PopularContent ~ contents:", contents)
  const [leftContents, rightContents] = React.useMemo(() => {
    if (!contents || contents.length === 0) return [null, null]
    if (contents.length <= 3) return [[...contents], null]
    return [
      contents.slice(0, 3),
      contents.slice(3, 6)
    ]
  }, [contents]);
  return (
    <div data-title="熱門文章" className='hot-content-wrapper'>
      <div className='hot-content-div'>
        <div className='hot-left-side'>
          {leftContents && leftContents.map((content, index) => {
            return <Content
              key={index}
              title={content.title}
              href={content.sitemapUrl}
            />
          })}
        </div>
        <div className='hot-right-side'>
          {rightContents && rightContents.map((content, index) => {
            return <Content
              key={index}
              title={content.title}
              href={content.sitemapUrl}
            />
          })}
        </div>
      </div>
    </div>
  );

  function Content({ title, href }) {
    return <Link href={href} className='hot-content'>
      <span className="ellipsis">{title}</span>
    </Link>
  }
}
