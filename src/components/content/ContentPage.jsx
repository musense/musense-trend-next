import React from "react";
import MainImage from '@components/content/mainImage';
import MainContent from '@components/content/mainContent';
import HotTrendWrapper from '@components/content/hotTrendWrapper';
import ExtendReading from '@components/content/extendReading';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";
const MemoizedHotTrendWrapper = React.memo(HotTrendWrapper);

export default function ContentPage({
    mainContent,
    titleContents,
    relatedArticles,
    popularTagList,
    isPreview = null
}) {
    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    console.log("🚀 ~ file: ContentPage.jsx:16 ~ titleContents:", titleContents)
    // console.log("🚀 ~ file: ContentPage.jsx:16 ~ mainContent:", mainContent)
    // console.log("🚀 ~ file: ContentPage.jsx:16 ~ popularTagList:", popularTagList)

    const filteredTitleContents = React.useMemo(() => {
        if (!titleContents || titleContents.length === 0) return null
        return titleContents.filter(content => content.hidden === false
            && content.categories.name.toLowerCase() !== '未分類'
        )
    }, [titleContents])
    // console.log("🚀 ~ file: index.jsx:22 ~ filteredTitleContents ~ filteredTitleContents:", filteredTitleContents)

    const [prevInfo, nextInfo] = React.useMemo(() => {
        let theIndex
        let mapContentInto
        if (!isPreview) {
            if (!mainContent) return [null, null]
            if (!filteredTitleContents) return [null, null]
            if (filteredTitleContents.length === 0) return [null, null]
            if (mainContent.serialNumber === null || typeof mainContent.serialNumber !== 'number') return [null, null];
            theIndex = filteredTitleContents.findIndex(a => a.serialNumber === mainContent.serialNumber)
            mapContentInto = (content) => content && ({
                _id: content._id,
                category: content.categories.name,
                sitemapUrl: content.sitemapUrl,
                title: content.title,
            })
        } else {
            theIndex = Math.floor(filteredTitleContents.length / 2)
            mapContentInto = (content) => content && ({
                // _id: content._id,
                category: content.categories.name,
                sitemapUrl: '#',
                title: content.title,
            })
        }

        const prevContent = theIndex === filteredTitleContents.length - 1 ? null : filteredTitleContents[theIndex + 1]
        const nextContent = theIndex === 0 ? null : filteredTitleContents[theIndex - 1]

        const prevInfo = prevContent ? mapContentInto(prevContent) : null
        const nextInfo = nextContent ? mapContentInto(nextContent) : null

        return [prevInfo, nextInfo]
    }, [filteredTitleContents, mainContent, isPreview]);

    const extendReading = React.useMemo(() => {
        if (!isPreview) return relatedArticles

        const mockRelatedArticlesIndex = [0, 1, 2]
        const mockedRelatedArticles = mockRelatedArticlesIndex.map(i => {
            const content = filteredTitleContents[i]
            return {
                sitemapUrl: '#',
                homeImagePath: content.homeImagePath,
                altText: content.altText || '',
                title: content.title,
            }
        })
        console.log("🚀 ~ file: ContentPage.jsx:73 ~ extendReading ~ mockedRelatedArticles:", mockedRelatedArticles)
        return mockedRelatedArticles
    }, [relatedArticles, filteredTitleContents, isPreview])

    return mainContent && (
        <>
            <MainImage
                imgSrc={mainContent.contentImagePath}
                imgAltText={mainContent.altText}
            />
            <MainContent
                content={mainContent}
                popularTagList={popularTagList}
                prevInfo={prevInfo}
                nextInfo={nextInfo}
                isPreview={isPreview}
            />

            {extendReading.length > 0 && <ExtendReading
                contents={extendReading}
            />}
            <MemoizedHotTrendWrapper position='bottom' popularTagList={popularTagList} />
        </>
    )




}
