import React from "react";
import MainImage from '@components/content/mainImage';
import MainContent from '@components/content/mainContent';
import HotTrendWrapper from '@components/content/hotTrendWrapper';
import ExtendReading from '@components/content/extendReading';
import { useAppContext } from "@store/context";
import MiscButtonContentList from "./miscButtonContentList";

const MemoizedHotTrendWrapper = React.memo(HotTrendWrapper);

export default function Page({
    mainContent,
    titleContents,
    relatedArticles,
    popularTagList
}) {
    const { state } = useAppContext();
    console.log("🚀 ~ file: ContentPage.jsx:16 ~ titleContents:", titleContents)
    console.log("🚀 ~ file: ContentPage.jsx:16 ~ mainContent:", mainContent)
    console.log("🚀 ~ file: ContentPage.jsx:16 ~ popularTagList:", popularTagList)

    const filteredTitleContents = React.useMemo(() => {
        if (!titleContents || titleContents.length === 0) return null
        return titleContents.filter(content => content.hidden === false
            && content.categories.name.toLowerCase() !== '未分類'
        )
    }, [titleContents])
    console.log("🚀 ~ file: index.jsx:22 ~ filteredTitleContents ~ filteredTitleContents:", filteredTitleContents)

    const [prevInfo, nextInfo] = React.useMemo(() => {
        if (!mainContent) return [null, null]
        if (!filteredTitleContents) return [null, null]
        if (filteredTitleContents.length === 0) return [null, null]
        if (mainContent.serialNumber === null || typeof mainContent.serialNumber !== 'number') return [null, null];

        const mapContentInto = (content) => content && ({
            _id: content._id,
            category: content.categories.name,
            sitemapUrl: content.sitemapUrl,
            title: content.title,
        })

        const theIndex = filteredTitleContents.findIndex(a => a.serialNumber === mainContent.serialNumber)
        const prevContent = theIndex === 0 ? null : filteredTitleContents[theIndex - 1]
        const nextContent = theIndex === filteredTitleContents.length - 1 ? null : filteredTitleContents[theIndex + 1]

        const prevInfo = prevContent ? mapContentInto(prevContent) : null
        const nextInfo = nextContent ? mapContentInto(nextContent) : null

        return [prevInfo, nextInfo]
    }, [filteredTitleContents, mainContent]);

    return mainContent && (
        <>
            <MainImage
                imgSrc={mainContent.contentImagePath}
                imgAltText={mainContent.altText}
            />
            <MainContent
                content={mainContent}
                popularTagList={popularTagList}
            />
            <MiscButtonContentList
                prevInfo={prevInfo}
                nextInfo={nextInfo}
            />
            {relatedArticles.length > 0 && <ExtendReading
                contents={relatedArticles}
            />}
            {state.clientWidth <= 768 && <MemoizedHotTrendWrapper popularTagList={popularTagList} />}
        </>
    )


}
