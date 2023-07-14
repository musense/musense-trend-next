import { useEffect } from "react";
import { pageViewByContent } from "@services/titleContents";

export default function useAddPageView(_id) {
    useEffect(() => {
        const payload = {
            apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
            _id: _id
        };
        pageViewByContent(payload);
    }, [_id]);
}
