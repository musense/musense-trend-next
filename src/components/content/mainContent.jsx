import React from "react";
// import './css/mainContent.css'
import MiscButtonContentList from "./miscButtonContentList";
import Tag from "./tag";
import HotTrendWrapper from "./hotTrendWrapper";


export default function MainContent({
    // id,
    content,
    prevInfo,
    nextInfo,
}) {
    console.log("🚀 ~ file: mainContent.jsx:9 ~ MainContent ~ content:", content)

    return (
        <div className="main-content-wrapper">
            <div className="content-left-side">
                <h1 className="content-title">{content.title}</h1>
                <div className="content-misc">
                    <div className="content-tags">{
                        content.tags.map((tag, index) => {
                            return <Tag
                                key={index}
                                href={tag.sitemapUrl}
                                tagName={`# ${tag.name}`}
                            />
                        })}
                    </div>
                    <div>
                            <span  className="content-create-date">
                                {`${new Date(content.createdAt).toLocaleDateString('en-ZA')}`}
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
            <HotTrendWrapper
                type={'desktop'}
                tags={content.tags}
            />
        </div>
    );


}
