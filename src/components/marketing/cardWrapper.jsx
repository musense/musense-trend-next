import React from 'react'
import Card from './card';
import { useAppContext } from "@store/context";
import useSetCommonPageItems from "@services/useSetCommonPageItems";

export default function CardWrapper({ commonPageItems }) {
    const { state, dispatch } = useAppContext();
    useSetCommonPageItems(commonPageItems, dispatch)

    const content = state.viewContents
        ? state.viewContents.map((content, index) =>
            <Card key={index} content={content} />)
        : <h3>{`目前還沒有文章！`}</h3>

    return <div className={'card-wrapper'}>
        {content}
    </div>
}