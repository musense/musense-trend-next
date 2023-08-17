import React, { useMemo } from "react";
import PageTemplate from "@components/page/pageTemplate";
import { useAppContext } from "@store/context";

export default function PageWrapper({ children = null }) {

    const { state } = useAppContext();
    const maxNumber = state.clientWidth < 768
        ? 3
        : 5

    console.log("🚀 ~ file: PageWrapper.jsx:9 ~ PageWrapper ~ maxNumber:", maxNumber)

    return <>
        {state.currTotalPage > 0 && <PageTemplate
            currPage={state.currPage}
            totalPage={state.currTotalPage}
            __MAX_SHOW_NUMBERS__={maxNumber}
        />}
        {children}
    </>
}