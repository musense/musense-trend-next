import React, { useRef, useEffect } from "react";
import Tag from "./tag";
import HotTrendWrapper from "./hotTrendWrapper";
import useResizeContentTags from "@services/useResizeContentTags";
import useAddPageView from "@services/useAddPageView";
import MiscButtonContentList from "./miscButtonContentList";
// import useScrollToPosition from '@services/useScrollToPosition';

const MemoizedHotTrendWrapper = React.memo(HotTrendWrapper);

export default function MainContent({
    content,
    popularTagList,
    prevInfo,
    nextInfo,
    isPreview
}) {
    // console.log("🚀 ~ file: mainContent.jsx:13 ~ content:", content)
    // console.log("🚀 ~ file: mainContent.jsx:13 ~ MainContent ~ popularTagList:", popularTagList)

    const contentTagsRef = useRef(null);
    console.log("🚀 ~ file: mainContent.jsx:15 ~ MainContent ~ contentTagsRef:", contentTagsRef)

    // useScrollToPosition(content._id)
    useResizeContentTags(contentTagsRef);
    useAddPageView(content._id, isPreview);

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
                            {isPreview
                                ? new Date(content.updatedAt).toLocaleDateString('en-ZA') 
                                : new Date(content.publishedAt).toLocaleDateString('en-ZA') 
                            }
                        </span>
                    </div>
                </div>
                <div
                    className="content-main-content"
                    dangerouslySetInnerHTML={{ __html: content.htmlContent }}
                />
                <MiscButtonContentList
                    prevInfo={prevInfo}
                    nextInfo={nextInfo}
                />
            </div>

            <MemoizedHotTrendWrapper position="content" popularTagList={popularTagList} />
        </div>
    );


}
