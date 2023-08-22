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
    currentPage,
    totalPage,
    __MAX_SHOW_NUMBERS__ = 5
}) => {

    const { dispatch } = useAppContext();

    const prevPage = useCallback(() => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currentPage: 'prev'
            }
        })
    }, [])
    const nextPage = useCallback(() => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currentPage: 'next'
            }
        })
    }, [])
    const setPage = useCallback((page) => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currentPage: page
            }
        })
    }, [])

    const middleLeftPoint = Math.floor(__MAX_SHOW_NUMBERS__ / 2)

    const showArray = useMemo(() => {
        if (!currentPage) return
        if (!__MAX_SHOW_NUMBERS__) return
        let array
        if (totalPage <= __MAX_SHOW_NUMBERS__) {
            array = Array.from(Array(totalPage), (_, index) => index + 1)
            return array
        }

        if (currentPage <= middleLeftPoint) {
            array = Array.from(Array(__MAX_SHOW_NUMBERS__), (_, index) => index + 1)
            return array
        }

        if (currentPage >= totalPage - middleLeftPoint) {
            array = Array.from(Array(totalPage), (_, index) => index + 1)
            array = array.slice(totalPage - 5, totalPage)
            return array
        }

        array = Array.from(Array(__MAX_SHOW_NUMBERS__), (_, index) => index - middleLeftPoint)
            .map(item => item + currentPage);
        return array.filter((item) => {
            return item > 0 && item <= totalPage
        })
    }, [__MAX_SHOW_NUMBERS__, currentPage, totalPage, middleLeftPoint])
    console.log("🚀 ~ file: pageTemplate.jsx:69 ~ showArray ~ showArray:", showArray)

    const showDots = totalPage > __MAX_SHOW_NUMBERS__
    const pageContent = <div className={'page-wrapper'}>
        <FirstButton setPage={setPage} currentPage={currentPage} />
        <PrevButton prevPage={prevPage} currentPage={currentPage} />
        <PageNumber setPage={setPage} currentPage={currentPage} showDots={showDots} showArray={showArray} totalPage={totalPage} />
        <NextButton nextPage={nextPage} currentPage={currentPage} totalPage={totalPage} />
        <LastButton setPage={setPage} currentPage={currentPage} totalPage={totalPage} />
    </div>

    return pageContent;
}

export default PageTemplate