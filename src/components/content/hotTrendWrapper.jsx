import React from 'react'
import Tag from './tag';

export default function HotTrendWrapper({ tags }) {
    console.log("🚀 ~ file: hotTrendWrapper.jsx:5 ~ HotTrendWrapper ~ tags:", tags)
    return <div className={`content-right-side`}>
        <div className="hot-trend"></div>
        <div className="hot-tag-wrapper">
            {tags && tags.map((tag, index) => {
                return <Tag
                    key={index}
                    href={tag.sitemapUrl}
                    tagName={`# ${tag.name}`}
                />;
            })}
        </div>
    </div>;
}
