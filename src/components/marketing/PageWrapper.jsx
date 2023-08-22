import React from "react";
import PageTemplate from "@components/page/pageTemplate";
import { useAppContext } from "@store/context";
import MiscButtonList from "./miscButtonList";

export default function PageWrapper({ sitemapUrl }) {

    const { state } = useAppContext();
    const maxNumber = state.clientWidth < 768 ? 3 : 5
    return <>
        {(state.currTotalPage > 0 && sitemapUrl !== "") && <PageTemplate
            currPage={state.currPage}
            totalPage={state.currTotalPage}
            __MAX_SHOW_NUMBERS__={maxNumber}
        />}
        <MiscButtonList sitemapUrl={sitemapUrl} />
    </>
}