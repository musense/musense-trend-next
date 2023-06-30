import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Card from './card';
import PageTemplate from "@components/page/pageTemplate";
import { useRouter } from 'next/router';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";


export default function CardWrapper({ contents }) {
    // console.log("🚀 ~ file: cardWrapper.jsx:10 ~ CardWrapper ~ contents:", contents)
    const { state, dispatch } = useAppContext();
    useInitial({
        state,
        dispatch
    });
    const router = useRouter();
    // console.log("🚀 ~ file: cardWrapper.jsx:17 ~ CardWrapper ~ state:", state)
    // console.log("🚀 ~ file: cardWrapper.jsx:17 ~ CardWrapper ~ router.query.type:", router.query.type)

    const cardWrapperRef = useRef(null)
    const lastSelectedPageRef = useRef(1)
    const __MAX_VIEW_COUNT__ = 6

    const [viewContents, setViewContents] = useState(null);

    useEffect(() => {
        if (!contents) return
        console.log("🚀 ~ file: cardWrapper.jsx:30 ~ useEffect ~ contents:", contents)
        dispatch({
            type: "SET_ALL_CONTENTS",
            payload: {
                contents: contents,
            }
        })
    }, [contents]);

    useEffect(() => {
        if (!state.viewContents) return
        setViewContents(state.viewContents)
    }, [state.viewContents]);

    useMemo(() => {
        if (!state.contents) return
        console.log("🚀 ~ file: cardWrapper.jsx:36 ~ useMemo ~ lastSelectedPageRef.current:", lastSelectedPageRef.current)
        console.log("🚀 ~ file: cardWrapper.jsx:36 ~ useMemo ~ state.currTotalPage:", state.currTotalPage)
        const start = (state.currTotalPage - 1) * __MAX_VIEW_COUNT__
        const end = start + __MAX_VIEW_COUNT__
        const slicedContents = state.contents.slice(start, end)
        if (lastSelectedPageRef.current > state.currTotalPage) {
            setViewContents(contents => contents
                // ? [...contents, ...slicedContents] 
                ? slicedContents
                : slicedContents)
            // cardWrapperRef.current.classList.add("toRight")
        } else if (lastSelectedPageRef.current < state.currTotalPage) {
            setViewContents(contents => contents
                // ? [...slicedContents, ...contents] 
                ? slicedContents
                : slicedContents)
            // cardWrapperRef.current.classList.add("toLeft")
        } else if (lastSelectedPageRef.current === state.currTotalPage && state.currTotalPage === 1) {
            setViewContents(slicedContents)
        }
        // setTimeout(() => {
        //     if (cardWrapperRef.current.classList.contains("toRight")) {
        //         setViewContents(contents => contents.length > 6 ? contents.slice(__MAX_VIEW_COUNT__, __MAX_VIEW_COUNT__ * 2) : contents)
        //         cardWrapperRef.current.classList.remove("toRight")
        //     } else if (cardWrapperRef.current.classList.contains("toLeft")) {
        //         setViewContents(contents => contents.length > 6 ? contents.slice(0, __MAX_VIEW_COUNT__) : contents)
        //         cardWrapperRef.current.classList.remove("toLeft")
        //     }
        // }, 500)
    }, [state.contents, state.currMaxViewCount, state.currTotalPage]);


    const Page = useCallback(() => {
        if (state.clientWidth < 400) {
            return <PageTemplate
                currPage={state.currPage}
                totalPage={state.currTotalPage}
                __MAX_SHOW_NUMBERS__={3}
            />
        } else {
            return <PageTemplate
                currPage={state.currPage}
                totalPage={state.currTotalPage}
                __MAX_SHOW_NUMBERS__={5}
            />
        }
    }, [state.clientWidth, state.currPage, state.currTotalPage])

    return <>
        <div ref={cardWrapperRef} className='card-wrapper'>

            {viewContents && viewContents.map((content, index) => {
                return (
                    <Card
                        key={index}
                        id={content._id}
                        content={content}
                    />
                );
            })}
        </div>
       {!state.filteredActive.seeMore && <Page />}
    </>
}