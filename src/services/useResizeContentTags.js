import { useEffect, useMemo } from "react";
import { useAppContext } from "@store/context";

export default function useResizeContentTags(contentTagsRef) {
    const { state } = useAppContext();

    const targetHeight = 75
    const divider = useMemo(() => {
        if (state.clientWidth === 0) return null
        if (state.clientWidth <= 768) {
            return 10;
        } else {
            return 1;
        }
    }, [state.clientWidth])
    const unit = useMemo(() => {
        if (state.clientWidth === 0) return null
        if (state.clientWidth <= 768) {
            return 'rem';
        } else {
            return 'px';
        }
    }, [state.clientWidth])

    function resizeContentTags(contentTagsRef, targetHeight, divider, unit) {
        const contentTagsDiv = contentTagsRef.current;
        let height = contentTagsDiv.clientHeight;
        let tagSize = 15;
        let columnGap = 28
        let rowGap = 15
        columnGap = columnGap / 2
        let targetColumnGapSizeStr = (columnGap / divider) + unit
        contentTagsDiv.style.setProperty('--tag-column-gap', targetColumnGapSizeStr);
        while (height > targetHeight) {
            if (tagSize > 12) {
                let targetTargetSizeStr = (--tagSize / divider) + unit
                let targetRowGapSizeStr = (--rowGap / divider) + unit
                contentTagsDiv.style.setProperty('--tag-size', targetTargetSizeStr);
                contentTagsDiv.style.setProperty('--tag-row-gap', targetRowGapSizeStr);
            } else if (columnGap > 0) {
                let targetColumnGapSizeStr = (--columnGap / divider) + unit
                contentTagsDiv.style.setProperty('--tag-column-gap', targetColumnGapSizeStr);
            } else if (rowGap > 0) {
                let targetRowGapSizeStr = (--rowGap / divider) + unit
                contentTagsDiv.style.setProperty('--tag-row-gap', targetRowGapSizeStr);
            } else {
                break
            }
            height = contentTagsDiv.clientHeight;
        }
    }

    useEffect(() => {
        if (contentTagsRef.current === null || divider === null || unit === null) {
            return;
        } else {
            resizeContentTags(contentTagsRef, targetHeight, divider, unit)
        }
    }, [contentTagsRef, targetHeight, divider, unit]);

}
