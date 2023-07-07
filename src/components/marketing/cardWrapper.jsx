import React from 'react'
import Card from './card';
import { useAppContext } from "@store/context";


export default function CardWrapper() {

    const { state } = useAppContext();

    const showCardWrapper = React.useMemo(() => {
        if (!state.viewContents) return false
        if (state.viewContents.length === 0) return false
        return true
    }, [state.viewContents]);

    return <div className={`card-wrapper ${showCardWrapper ? '' : 'no-card'}`}>
        {showCardWrapper
            ? state.viewContents.map((content, index) => {
                return (
                    <Card
                        key={index}
                        content={content}
                    />
                );
            })
            : <h3 >{`目前還沒有文章！`}</h3>
        }
    </div>
}