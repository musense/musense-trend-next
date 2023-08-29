import React from 'react'

import {
    FirstButton,
    PrevButton,
    PageNumber,
    NextButton,
    LastButton,
} from "./pageElement";
import { useRouter } from 'next/router';
import { useAppContext } from "@store/context";

const PageTemplate = () => {
    const router = useRouter();
    const { state } = useAppContext();

    const currentPage = Number(router.query.currentPage) || 1;
    const totalPage = state.currTotalPage
    const __MAX_SHOW_NUMBERS__ = state.clientWidth < 768 ? 3 : 5

    const pageContent = <div className={'page-wrapper'}>
        <FirstButton currentPage={currentPage} />
        <PrevButton currentPage={currentPage} />
        <PageNumber
            currentPage={currentPage}
            totalPage={totalPage}
            deviceType={state.clientWidth <= 768 ? 'mobile' : 'desktop'}
            __MAX_SHOW_NUMBERS__={__MAX_SHOW_NUMBERS__}
        />
        <NextButton currentPage={currentPage} totalPage={totalPage} />
        <LastButton currentPage={currentPage} totalPage={totalPage} />
    </div>

    return pageContent;
}

export default PageTemplate