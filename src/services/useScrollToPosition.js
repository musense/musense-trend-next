import { useEffect } from "react";

export default function useScrollToPosition(trigger = undefined, position = 0) {
    console.log("🚀 ~ file: useScrollToPosition.js:4 ~ useScrollToPosition ~ trigger:", trigger)
    useEffect(() => {
        if (!trigger || trigger === '') window.scrollTo(0, 0);
        else window.scrollTo(0, position);
    }, [trigger, position]);
}
