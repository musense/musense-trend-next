import React, { useState, useEffect } from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import MiscButtonList from '@components/marketing/miscButtonList';
import PopularContent from '@components/marketing/hotContent';
import { useAppContext } from "@store/context";
import PageTemplate from "@components/page/pageTemplate";
import MarketingBanner from "./marketingBanner";
import useInitial from "@services/useInitial";


export default function Page({
    paramName = '',
    commonPageItems,
    categoryList = null,
    popularContents,
    sitemapUrl = '',
}) {
    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })
    useEffect(() => {
        console.log("🚀 ~ file: index.jsx:19 ~ useEffect ~ commonPageItems:", commonPageItems)
        dispatch({
            type: "RESET_FILTER_STATE",
        })
        dispatch({
            type: "SET_ALL_CONTENTS",
            payload: {
                contents: commonPageItems,
            }
        })
    }, [commonPageItems, dispatch]);

    const Page = React.useCallback(() => {
        if (state.clientWidth < 400) {
            return <>
                <PageTemplate
                    currPage={state.currPage}
                    totalPage={state.currTotalPage}
                    __MAX_SHOW_NUMBERS__={3}
                />
                <MiscButtonList />
            </>
        } else {
            return <>
                <PageTemplate
                    currPage={state.currPage}
                    totalPage={state.currTotalPage}
                    __MAX_SHOW_NUMBERS__={5}
                />
                <MiscButtonList />
            </>
        }
    }, [state.clientWidth, state.currPage, state.currTotalPage, commonPageItems])
    return (<>
        {sitemapUrl === '' && <MarketingBanner />}
        <MarketingButtonList categoryList={categoryList} paramName={paramName} />
        <CardWrapper />
        {sitemapUrl === ''
            ? <MiscButtonList />
            : <Page />}
        <PopularContent contents={popularContents} />
    </>);
}
