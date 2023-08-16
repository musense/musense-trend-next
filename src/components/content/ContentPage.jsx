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
    previousAndNextPage,
    relatedArticles,
    popularTagList,
    isPreview = false
}) {
    console.log("🚀 ~ file: ContentPage.jsx:31 ~ mainContent:", mainContent)
    console.log("🚀 ~ file: ContentPage.jsx:31 ~ ContentPage ~ previousAndNextPage:", previousAndNextPage)
    const { previousEditor, nextEditor } = previousAndNextPage;

    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    const extendReading = React.useMemo(() => {
        if (isPreview) return []
        return relatedArticles
    }, [relatedArticles, isPreview])

    return mainContent && (
        <>
            <MainImage
                imgSrc={mainContent.contentImagePath}
                imgAltText={mainContent.altText}
            />
            <MainContent
                content={mainContent}
                popularTagList={popularTagList}
                prevInfo={previousEditor}
                nextInfo={nextEditor}
                isPreview={isPreview}
            />

            {extendReading.length > 0 && <ExtendReading
                contents={extendReading}
            />}
            <MemoizedHotTrendWrapper position='bottom' popularTagList={popularTagList} />
        </>
    )




}
