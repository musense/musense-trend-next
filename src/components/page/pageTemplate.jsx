import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './pageTemplate.module.css'
import { useAppContext } from "@store/context";

const PageTemplate = ({
    currPage,
    totalPage,
    __MAX_SHOW_NUMBERS__ = 5
}) => {
    // console.log("🚀 ~ file: pageTemplate.jsx:10 ~ currPage:", currPage)
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
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currPage: page
            }
        })
    }, [])

    const [showArray, setShowArray] = useState(null);
    // console.log("🚀 ~ file: pageTemplate.jsx:22 ~ showArray:", showArray)
    const currentPage = currPage
    const middleRightPoint = Math.ceil(__MAX_SHOW_NUMBERS__ / 2)
    const middleLeftPoint = Math.floor(__MAX_SHOW_NUMBERS__ / 2)

    const AnchorButton = ({
        cb,
        styles,
        label,
        // index = null,
    }) => {
        const props = {
            onClick: cb,
            value: "<",
            className: styles,
            // key: index,
        }
        return (
            <button {...props}>
                {label}
            </button>
        )
    }

    useEffect(() => {
        if (!currentPage) return
        if (!__MAX_SHOW_NUMBERS__) return
        // console.log("🚀 ~ file pageTemplate.jsx:16 ~ totalPage:", totalPage)
        // console.log("🚀 ~ file pageTemplate.jsx:16 ~ currentPage:", currentPage)
        // console.log("🚀 ~ file pageTemplate.jsx:16 ~ middlePoint:", middleRightPoint)
        const array = Array.from(Array(__MAX_SHOW_NUMBERS__), (_, index) => index - middleLeftPoint)
            .map(item => item + currentPage);
        setShowArray(array);
        // currentPageRef.current = currentPage
    }, [__MAX_SHOW_NUMBERS__, currentPage]);


    return (
        <div className={styles['page-wrapper']}>
            <div>
                < AnchorButton
                    cb={() => { prevPage() }}
                    styles={currentPage === 1 ? styles.displayNone : ""}
                    label={'<'}
                />
                {totalPage - currentPage < middleLeftPoint && totalPage > __MAX_SHOW_NUMBERS__ && (
                    <p>···</p>
                )}
                {showArray && showArray
                    .map((item, index) => {
                        if (item <= 0)
                            return;
                        if (item > totalPage)
                            return;
                        // console.log(`🚀 ~ file pageTemplate.jsx: item `, item);
                        return <AnchorButton
                            key={index}
                            cb={() => setPage(item)}
                            styles={currentPage === item ? styles.active : ""}
                            label={(item)}
                        />
                    })}
                {currentPage < middleRightPoint && totalPage > __MAX_SHOW_NUMBERS__ && (
                    <p>···</p>
                )}
                < AnchorButton
                    cb={() => { nextPage() }}
                    styles={currentPage === totalPage || totalPage === 0 ? styles.displayNone : ""}
                    label={'>'}
                />
            </div>
        </div>
    );
}


export default PageTemplate