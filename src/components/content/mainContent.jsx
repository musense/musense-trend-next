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
                            return <Tag key={index} tagName={`# ${tag.name}`} index={index} />
                        })}
                    </div>
                    <div className="content-create-date">
                        {/* {`${new Date(content.createDate).toLocaleDateString()} ${new Date(content.createDate).toLocaleTimeString()}`} */}
                        {`${new Date(content.createdAt).toLocaleDateString('en-ZA')}`}
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
