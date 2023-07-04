import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Card from './card';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";


export default function CardWrapper({ contents }) {

    const { state, dispatch } = useAppContext();
    useInitial({
        state,
        dispatch
    });

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

    return <div className='card-wrapper'>
        {state.viewContents && state.viewContents.map((content, index) => {
            return (
                <Card
                    key={index}
                    id={content._id}
                    content={content}
                />
            );
        })}
    </div>
}