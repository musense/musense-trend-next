import React from "react";
import MarketingButtonList from '@components/marketing/marketingButtonList';
import CardWrapper from '@components/marketing/cardWrapper';
import MiscButtonList from '@components/marketing/miscButtonList';
import PopularContent from '@components/marketing/hotContent';
import PageWrapper from '@components/marketing/pageWrapper';
import { useAppContext } from "@store/context";

import MarketingBanner from "./marketingBanner";
import useInitial from "@services/useInitial";

export default function MarketingPage({
    openTitleName = '',
    commonPageItems,
    categoryList = null,
    popularContents,
    sitemapUrl = '',
}) {
    const { state, dispatch } = useAppContext();
    useInitial({ state, dispatch })

    const banner = sitemapUrl === '' && <MarketingBanner />
    const buttonList = <MarketingButtonList categoryList={categoryList} openTitleName={openTitleName} />
    const cardWrapper = <CardWrapper commonPageItems={commonPageItems} />
    const cardFooter = sitemapUrl === ''
        ? <MiscButtonList />
        : (<PageWrapper>
            <MiscButtonList />
        </PageWrapper>)
    const popularContent = <PopularContent contents={popularContents} />

    return (<>
        {banner}
        {buttonList}
        {cardWrapper}
        {cardFooter}
        {popularContent}
    </>);
}

