import React, { useCallback, useMemo } from 'react'
import styles from './pageTemplate.module.css'
import { useAppContext } from "@store/context";

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
    }, [__MAX_SHOW_NUMBERS__, currPage, totalPage])

    return (
        <div className={styles['page-wrapper']}>
            <div>
                <AnchorButton
                    cb={() => prevPage()}
                    styles={currPage === 1 ? styles.displayNone : ""}
                    label={'<'}
                />
                <LeftDots
                    totalPage={totalPage}
                    currentPage={currPage}
                    middleLeftPoint={middleLeftPoint}
                    __MAX_SHOW_NUMBERS__={__MAX_SHOW_NUMBERS__}
                />
                <PageNumber
                    showArray={showArray}
                    setPage={setPage}
                    currentPage={currPage}
                />
                <RightDots
                    currentPage={currPage}
                    middleRightPoint={middleRightPoint}
                    totalPage={totalPage}
                    __MAX_SHOW_NUMBERS__={__MAX_SHOW_NUMBERS__}
                />
                <AnchorButton
                    cb={() => nextPage()}
                    styles={currPage === totalPage || totalPage === 0 ? styles.displayNone : ""}
                    label={'>'}
                />
            </div>
        </div>
    );
}


export default PageTemplate


const AnchorButton = ({ cb, styles, label }) => {
    const props = {
        onClick: cb,
        value: "<",
        className: styles,
    }
    return (
        <button {...props}>
            {label}
        </button>
    )
}
const LeftDots = ({
    totalPage,
    currentPage,
    middleLeftPoint,
    __MAX_SHOW_NUMBERS__
}) => {
    return totalPage - currentPage < middleLeftPoint && totalPage > __MAX_SHOW_NUMBERS__ && (<p>···</p>)
};
function PageNumber({ showArray, setPage, currentPage }) {
    return showArray && showArray.map((item, index) => {
        return <AnchorButton
            key={index}
            cb={() => setPage(item)}
            styles={currentPage === item ? styles.active : ""}
            label={(item)} />;
    });
}

const RightDots = ({
    currentPage,
    middleRightPoint,
    totalPage,
    __MAX_SHOW_NUMBERS__
}) => {
    return currentPage < middleRightPoint && totalPage > __MAX_SHOW_NUMBERS__ && (<p>···</p>)
};