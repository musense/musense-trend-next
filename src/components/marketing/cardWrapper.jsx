import React from 'react'
import Card from './card';
import { useAppContext } from "@store/context";


export default function CardWrapper() {

    const { state } = useAppContext();

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