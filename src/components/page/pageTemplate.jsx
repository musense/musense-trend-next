import React, { useCallback, useMemo } from 'react'
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

    const { dispatch } = useAppContext();

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
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currPage: page
            }
        })
    }, [])

    const middleLeftPoint = Math.floor(__MAX_SHOW_NUMBERS__ / 2)
    const middleRightPoint = Math.ceil(__MAX_SHOW_NUMBERS__ / 2)

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
        <FirstButton setPage={setPage} currPage={currPage} />
        <PrevButton prevPage={prevPage} currPage={currPage} />
        <LeftDots cb={() => setPage(currPage - middleRightPoint)} showArray={showArray} />
        <PageNumber showArray={showArray} setPage={setPage} currentPage={currPage} />
        <RightDots cb={() => setPage(currPage + middleRightPoint)} showArray={showArray} totalPage={totalPage} />
        <NextButton nextPage={nextPage} currPage={currPage} totalPage={totalPage} />
        <LastButton setPage={setPage} currPage={currPage} totalPage={totalPage} />
    </div>);
}

export default PageTemplate