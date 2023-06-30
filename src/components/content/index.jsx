import React from "react";
import MainImage from '@components/content/mainImage';
import MainContent from '@components/content/mainContent';
import HotTrendWrapper from '@components/content/hotTrendWrapper';
import PopularContent from '@components/content/popularContent';
import { getTitleContentsByID } from "@services/titleContents";

export default function Page({
    mainContent,
    titleContents,
    // img, 
    // content, 
    // tags, 
    // popularContents
}) {
    console.log("🚀 ~ file: index.jsx:16 ~ titleContents:", titleContents)
    console.log("🚀 ~ file: index.jsx:16 ~ mainContent:", mainContent)
    // console.log("🚀 ~ file: index.jsx:8 ~ Page ~ id:", id)
    // const [mainContent, setMainContent] = React.useState(null);
    // const [titleContents, setTitleContents] = React.useState(null);
    const [prevInfo, setPrevInfo] = React.useState(null);
    const [nextInfo, setNextInfo] = React.useState(null);
    // React.useEffect(() => {
    //     const payload = {
    //         _id: id,
    //         apiUrl: process.env.NEXT_PUBLIC_SERVER_URL
    //     }
    //     getTitleContentsByID(payload)
    //         .then(res => setMainContent(res))
    //     getTitleContents(payload)
    //         .then(res => setTitleContents(res))

    // }, [id]);

    const filteredTitleContents = React.useMemo(() => {
        return titleContents.filter(content => content.hidden === false
            && content.categories.name.toLowerCase() !== 'uncategorized'
        )
    }, [titleContents])

    const findOneByIdAndReturnPrevNextID = (arr = [], serialNumber = null) => {

        if (arr.length === 0) return null
        if (serialNumber === null || typeof serialNumber !== 'number') return null;
        const mapContentInto = (content) => content && ({
            _id: content._id,
            category: content.categories.name,
            sitemapUrl: content.sitemapUrl,
            title: content.title,
        })

        const theIndex = arr.findIndex(a => a.serialNumber === serialNumber)
        const prevContent = theIndex === arr.length - 1 ? null : arr[theIndex + 1]
        const nextContent = theIndex === 0 ? null : arr[theIndex - 1]

        const prevInfo = prevContent ? mapContentInto(prevContent) : null
        const nextInfo = nextContent ? mapContentInto(nextContent) : null
        setPrevInfo(prevInfo)
        setNextInfo(nextInfo)
    };

    React.useEffect(() => {
        findOneByIdAndReturnPrevNextID(filteredTitleContents, mainContent.serialNumber)
    }, [filteredTitleContents, mainContent]);

    return mainContent && (

        <>
            <MainImage
                imgSrc={mainContent.contentImagePath}
                imgAltText={mainContent.altText}
            />
            <MainContent
                content={mainContent}
                prevInfo={prevInfo}
                nextInfo={nextInfo}
            />
            <PopularContent
                // popularContents={popularContents}
            />
            <HotTrendWrapper
                type={'mobile'}
                tags={mainContent.tags}
            />
        </>
    )


}
