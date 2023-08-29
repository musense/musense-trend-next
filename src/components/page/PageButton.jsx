import React, { useCallback } from "react";
import { useRouter } from 'next/router';
import { useAppContext } from "@store/context";

export default function PageButton({ styles, label, value }) {
    const router = useRouter();
    const { dispatch } = useAppContext();

    const setPage = useCallback((value) => {
        dispatch({
            type: 'SET_CURRENT_PAGE',
            payload: {
                currentPage: value
            }
        })
    }, [dispatch])

    const handleClick = useCallback(() => {
        if (Number(value) === Number(router.query.currentPage)) return
        router.push(
            `/trend/${router.query.sitemapUrl}?currentPage=${value}`,
            undefined,
            {
                shallow: true,
                scroll: true
            }
        )
        setPage(value)
    }, [router, value, setPage])

    const props = {
        onClick: handleClick,
        className: `page ${styles}`,
    }
    return (
        <button {...props}>
            {label}
        </button>
    )
}
