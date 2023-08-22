import React from "react";
import PageTemplate from "@components/page/pageTemplate";
import { useAppContext } from "@store/context";
import MiscButtonList from "./miscButtonList";

export default function PageWrapper({ sitemapUrl }) {

    const hasSitemapUrl = sitemapUrl !== '' ? true : false
    const { state } = useAppContext();
    const maxNumber = state.clientWidth < 768 ? 3 : 5
    const content = (hasSitemapUrl) => hasSitemapUrl
        ? <>
            {state.currTotalPage > 0 && <PageTemplate
                currentPage={state.currentPage}
                totalPage={state.currTotalPage}
                __MAX_SHOW_NUMBERS__={maxNumber}
            />}
            <MiscButtonList hasSitemapUrl={hasSitemapUrl} />
        </>
        : <MiscButtonList hasSitemapUrl={hasSitemapUrl} />

    return content(hasSitemapUrl)
}