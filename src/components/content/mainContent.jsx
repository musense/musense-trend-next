import React, { useRef, useEffect } from "react";
import Tag from "./tag";
import HotTrendWrapper from "./hotTrendWrapper";
import useReSizeContentTags from "@services/useReSizeContentTags";
import useAddPageView from "@services/useAddPageView";
// import useScrollToPosition from '@services/useScrollToPosition';

const MemoizedHotTrendWrapper = React.memo(HotTrendWrapper);

export default function MainContent({
    content,
    popularTagList
}) {
    console.log("🚀 ~ file: mainContent.jsx:13 ~ content:", content)
    console.log("🚀 ~ file: mainContent.jsx:13 ~ MainContent ~ popularTagList:", popularTagList)

    const contentTagsRef = useRef(null);
    console.log("🚀 ~ file: mainContent.jsx:15 ~ MainContent ~ contentTagsRef:", contentTagsRef)

    // useScrollToPosition(content._id)
    useReSizeContentTags(contentTagsRef);
    useAddPageView(content._id);

    return (
        <div className="main-content-wrapper">
            <div className="content-left-side">
                <h1 className="content-title">{content.title}</h1>
                <div className="content-misc">
                    {content.tags && <div ref={contentTagsRef} className="content-tags">{
                        content.tags.map((tag, index) => {
                            return <Tag
                                key={index}
                                href={tag.sitemapUrl}
                                tagName={`# ${tag.name}`}
                            />
                        })}
                    </div>}
                    <div className="content-date-wrapper">
                        <span className="content-create-date">
                            {`${new Date(content.publishedAt).toLocaleDateString('en-ZA')}`}
                        </span>
                    </div>
                </div>
                <div
                    className="content-main-content"
                    dangerouslySetInnerHTML={{ __html: content.htmlContent }}
                />
            </div>
            <MemoizedHotTrendWrapper position="content" popularTagList={popularTagList} />
        </div>
    );


}
