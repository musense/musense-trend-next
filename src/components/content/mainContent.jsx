import React from "react";
import MiscButtonContentList from "./miscButtonContentList";
import Tag from "./tag";
import HotTrendWrapper from "./hotTrendWrapper";
import { useAppContext } from "@store/context";
import { pageViewByContent } from "@services/titleContents";

export default function MainContent({
    content,
    prevInfo,
    nextInfo,
}) {
    console.log("🚀 ~ file: mainContent.jsx:13 ~ content:", content)
    const { state } = useAppContext();
    React.useEffect(() => {
        const payload = {
            apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
            _id: content._id
        }
        pageViewByContent(payload)
    }, [content._id]);
    return (
        <div className="main-content-wrapper">
            <div className="content-left-side">
                <h1 className="content-title">{content.title}</h1>
                <div className="content-misc">
                    {content.tags && <div className="content-tags">{
                        content.tags.map((tag, index) => {
                            return <Tag
                                key={index}
                                href={tag.sitemapUrl}
                                tagName={`# ${tag.name}`}
                            />
                        })}
                    </div>}
                    <div>
                        <span className="content-create-date">
                            {`${new Date(content.publishedAt).toLocaleDateString('en-ZA')}`}
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
            {state.clientWidth > 768 && <HotTrendWrapper tags={content.tags} />}
        </div>
    );


}
