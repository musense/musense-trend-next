import React, { useEffect, useMemo } from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import MiscButtonList from '@components/marketing/miscButtonList';
import PopularContent from '@components/marketing/hotContent';
import { useAppContext } from "@store/context";
import PageTemplate from "@components/page/pageTemplate";
import MarketingBanner from "./marketingBanner";
import useInitial from "@services/useInitial";
// import useScrollToPosition from "@services/useScrollToPosition";

export default function Page({
    paramName = '',
    commonPageItems,
    categoryList = null,
    popularContents,
    sitemapUrl = '',
}) {
    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })
    // useScrollToPosition(sitemapUrl,10)
    useEffect(() => {
        console.log("🚀 ~ file: index.jsx:19 ~ useEffect ~ commonPageItems:", commonPageItems)
        dispatch({
            type: "RESET_FILTER_STATE",
        })
        dispatch({
            type: "SET_ALL_CONTENTS",
            payload: {
                contents: [
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                    ...commonPageItems,
                ],
            }
        })
    }, [commonPageItems, dispatch]);

    return (<>
        {sitemapUrl === '' && <MarketingBanner />}
        <MarketingButtonList categoryList={categoryList} paramName={paramName} />
        <CardWrapper />
        {sitemapUrl === ''
            ? <MiscButtonList />
            : <PageWrapper children={<MiscButtonList />} />}
        <PopularContent contents={popularContents} />
    </>);
}

function PageWrapper({ children = null }) {

    const { state, dispatch } = useAppContext();
    const maxNumber = useMemo(() => {
        if (state.clientWidth === 0) return 0
        if (state.clientWidth < 768) {
            return 3
        }
        return 5
    }, [state.clientWidth])

    return <>
        {state.currTotalPage > 0 && <PageTemplate
            currPage={state.currPage}
            totalPage={state.currTotalPage}
            __MAX_SHOW_NUMBERS__={maxNumber}
        />}
        {children}
    </>

}