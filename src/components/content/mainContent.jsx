import React, { useRef } from "react";
import Tag from "./tag";
import HotTrendWrapper from "./hotTrendWrapper";
import useResizeContentTags from "@services/useResizeContentTags";
import useAddPageView from "@services/useAddPageView";
import MiscButtonContentList from "./miscButtonContentList";

export default function MainContent({
    content,
    popularTagList,
    prevInfo,
    nextInfo,
    isPreview
}) {

    const contentTagsRef = useRef(null);
    console.log("🚀 ~ file: mainContent.jsx:15 ~ MainContent ~ contentTagsRef:", contentTagsRef)

    useResizeContentTags(contentTagsRef);
    useAddPageView(content._id, isPreview);

    const contentTags = content.tags && <div ref={contentTagsRef} className="content-tags">{
        content.tags.map((tag, index) => {
            return <Tag
                key={index}
                href={tag.sitemapUrl}
                tagName={`# ${tag.name}`}
            />
        })}
    </div>
    const contentPublishedDate = isPreview
        ? new Date(content.updatedAt).toLocaleDateString('en-ZA')
        : new Date(content.publishedAt).toLocaleDateString('en-ZA')

    const mainContent = <div
        className="content-main-content"
        dangerouslySetInnerHTML={{ __html: content.htmlContent }}
    />
    return (
        <div className="main-content-wrapper">
            <div className="content-left-side">
                <h1 className="content-title">
                    {content.title}
                </h1>
                <div className="content-misc">
                    {contentTags}
                    <div className="content-date-wrapper">
                        {contentPublishedDate}
                    </div>
                </div>
                {mainContent}
                <MiscButtonContentList
                    prevInfo={prevInfo}
                    nextInfo={nextInfo}
                />
            </div>

            <HotTrendWrapper
                position="content"
                popularTagList={popularTagList} />
        </div>
    );


}
