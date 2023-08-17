import React from "react";
import PageTemplate from "@components/page/pageTemplate";
import { useAppContext } from "@store/context";

export default function PageWrapper({ children = null }) {

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