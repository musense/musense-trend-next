import React from "react";
import MainImage from '@components/content/mainImage';
import MainContent from '@components/content/mainContent';
import HotTrendWrapper from '@components/content/hotTrendWrapper';
import ExtendReading from '@components/content/extendReading';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";

export default function ContentPage({
    mainContent,
    previousAndNextPage,
    relatedArticles,
    popularTagList,
    isPreview = false
}) {
    const { previousEditor, nextEditor } = previousAndNextPage;

    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

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
            <ExtendReading
                contents={relatedArticles}
            />
            <HotTrendWrapper
                position='bottom'
                popularTagList={popularTagList} />
        </>
    )




}
