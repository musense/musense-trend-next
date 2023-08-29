import React from 'react'

import {
    FirstButton,
    PrevButton,
    PageNumber,
    NextButton,
    LastButton,
} from "./pageElement";
import { useRouter } from 'next/router';

const PageTemplate = ({
    totalPage,
    __MAX_SHOW_NUMBERS__ = 5
}) => {
    const router = useRouter();
    const currentPage = Number(router.query.currentPage) || 1;

    const pageContent = <div className={'page-wrapper'}>
        <FirstButton currentPage={currentPage} />
        <PrevButton currentPage={currentPage} />
        <PageNumber
            currentPage={currentPage}
            totalPage={totalPage}
            __MAX_SHOW_NUMBERS__={__MAX_SHOW_NUMBERS__}
        />
        <NextButton currentPage={currentPage} totalPage={totalPage} />
        <LastButton currentPage={currentPage} totalPage={totalPage} />
    </div>

    return pageContent;
}

export default PageTemplate