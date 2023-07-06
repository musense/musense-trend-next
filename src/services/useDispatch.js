import React from "react";
import { useAppContext } from "@store/context";

export default function useDispatch(type) {
    const { dispatch } = useAppContext();

    const useHandleDispatch = (props) => React.useCallback(() => {
        dispatch({
            type: type,
            payload: {
                ...props
            }
        });
    }, [props]);

    return useHandleDispatch;
}
