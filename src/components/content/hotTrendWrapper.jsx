import React from 'react'
import Tag from './tag';

const InnerHotTrendWrapper = ({
    position,
    popularTagList,
}) => {

    const content = popularTagList && popularTagList.map((tag, index) => {
        return <Tag
            key={index}
            href={tag.sitemapUrl}
            tagName={`# ${tag.name}`}
        />;
    })

    return <div className={`content-right-side ${position}`}>
        <div className="hot-trend" />
        <div className="hot-tag-wrapper">
            {content}
        </div>
    </div>;
}

const HotTrendWrapper = React.memo(InnerHotTrendWrapper);

export default HotTrendWrapper