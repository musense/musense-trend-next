import { useEffect } from "react";
import { pageViewByContent } from "@services/titleContents";

export default function useAddPageView(_id, isPreview) {
    useEffect(() => {
        if (isPreview) return;
        const payload = {
            apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
            _id: _id
        };
        pageViewByContent(payload);
    }, [_id, isPreview]);
}
