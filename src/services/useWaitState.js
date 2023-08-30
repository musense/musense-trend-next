import { useEffect, useState } from "react";

export default function useWaitState(active) {
    const [prevState, setPrevState] = useState(false);
    useEffect(() => {
        if (prevState && !active) {
            setTimeout(() => {
                setPrevState(active)
            }, 300)
            return
        }
        if (active) {
            setPrevState(active)
            return
        }

    }, [active, prevState]);
    return prevState;
}
