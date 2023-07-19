import React, { useCallback, useMemo, useEffect } from 'react'
import { useAppContext } from "@store/context";
import {
    FirstButton,
    PrevButton,
    LeftDots,
    PageNumber,
    RightDots,
    NextButton,
    LastButton,
} from "./pageElement";
// import useScrollToPosition from '@services/useScrollToPosition';

const PageTemplate = ({
    currPage,
    totalPage,
    __MAX_SHOW_NUMBERS__ = 5
}) => {

    console.log("🚀 ~ file: pageTemplate.jsx:21 ~ currPage:", currPage)
    // useScrollToPosition(currPage)

    console.log("🚀 ~ file: pageTemplate.jsx:9 ~ totalPage:", totalPage)
    const { state, dispatch } = useAppContext();

    const prevPage = useCallback(() => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currPage: 'prev'
            }
        })
    }, [])
    const nextPage = useCallback(() => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currPage: 'next'
            }
        })
    }, [])
    const setPage = useCallback((page) => {
        if (page < 1) page = 1
        if (page > totalPage) page = totalPage

        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currPage: page
            }
        })
    }, [])

    const middleRightPoint = Math.ceil(__MAX_SHOW_NUMBERS__ / 2)
    const middleLeftPoint = Math.floor(__MAX_SHOW_NUMBERS__ / 2)

    const showArray = useMemo(() => {
        if (!currPage) return
        if (!__MAX_SHOW_NUMBERS__) return
        const array = Array.from(Array(__MAX_SHOW_NUMBERS__), (_, index) => index - middleLeftPoint)
            .map(item => item + currPage);
        return array.filter((item) => {
            return item > 0 && item <= totalPage
        })
    }, [__MAX_SHOW_NUMBERS__, currPage, totalPage, middleLeftPoint])

    return (<div className={'page-wrapper'}>
        <div>
            <FirstButton setPage={setPage} currPage={currPage} />
            <PrevButton prevPage={prevPage} currPage={currPage} />
            <LeftDots cb={() => setPage(currPage - 3)} showArray={showArray} />
            <PageNumber showArray={showArray} setPage={setPage} currentPage={currPage} />
            <RightDots cb={() => setPage(currPage + 3)} showArray={showArray} totalPage={totalPage} />
            <NextButton nextPage={nextPage} currPage={currPage} totalPage={totalPage} />
            <LastButton setPage={setPage} currPage={currPage} totalPage={totalPage} />
        </div>
    </div>);
}

export default PageTemplate