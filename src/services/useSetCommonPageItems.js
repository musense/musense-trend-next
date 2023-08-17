import { useEffect } from "react";

export default function useSetCommonPageItems(commonPageItems, dispatch) {

    useEffect(() => {
        dispatch({
            type: "RESET_FILTER_STATE",
        })
        dispatch({
            type: "SET_ALL_CONTENTS",
            payload: {
                contents: commonPageItems,
            }
        })
    }, [commonPageItems, dispatch]);
}
