import React, { useState, useEffect } from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import MiscButtonList from '@components/marketing/miscButtonList';
import PopularContent from '@components/marketing/hotContent';
import { useAppContext } from "@store/context";
import PageTemplate from "@components/page/pageTemplate";

export default function Page({
    paramName = null,
    commonPageItems,
    categoryList = null,
    popularContents,
    sitemapUrl = null,
}) {
    console.log("🚀 ~ file: index.jsx:15 ~ sitemapUrl:", sitemapUrl)
    console.log("🚀 ~ file: index.jsx:15 ~ paramName:", paramName)
    console.log("🚀 ~ file: index.jsx:15 ~ categoryList:", categoryList)
    const { state, dispatch } = useAppContext();
    console.log("🚀 ~ file: index.jsx:15 ~ state:", state)
    const Page = React.useCallback(() => {
        if (state.clientWidth < 400) {
            return <PageTemplate
                currPage={state.currPage}
                totalPage={state.currTotalPage}
                __MAX_SHOW_NUMBERS__={3}
            />
        } else {
            return <PageTemplate
                currPage={state.currPage}
                totalPage={state.currTotalPage}
                __MAX_SHOW_NUMBERS__={5}
            />
        }
    }, [state.clientWidth, state.currPage, state.currTotalPage])
    return (<>
        <MarketingButtonList categoryList={categoryList} paramName={paramName} />
        <CardWrapper contents={commonPageItems} />
        {sitemapUrl === null
            ? <MiscButtonList />
            : <Page />}
        <PopularContent contents={popularContents} />
    </>);
}
