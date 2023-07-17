import { useEffect, useState } from "react";

export default function useWaitState(active) {
    const [prevState, setPrevState] = useState();
    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setPrevState(active)
            }, 500)
        }
    }, [active]);
    return  prevState ;
}
