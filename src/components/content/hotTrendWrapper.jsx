import React from 'react'
import Tag from './tag';

export default function HotTrendWrapper({ popularTagList }) {

    console.log("🚀 ~ file: hotTrendWrapper.jsx:5 ~ HotTrendWrapper ~ popularTags:", popularTagList)
    return <div className={`content-right-side`}>
        <div className="hot-trend"></div>
        <div className="hot-tag-wrapper">
            {popularTagList && popularTagList.map((tag, index) => {
                return <Tag
                    key={index}
                    href={tag.sitemapUrl}
                    tagName={`# ${tag.name}`}
                />;
            })}
        </div>
    </div>;
}
