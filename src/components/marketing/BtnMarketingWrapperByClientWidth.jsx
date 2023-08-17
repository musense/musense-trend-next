import React, { useCallback, useMemo } from "react";
import {
    DeskTopBtnMarketingWrapper,
    MobileBtnMarketingWrapper,
    CommonTitle
} from "./marketingButtonElements";
import { useAppContext } from "@store/context";

function BtnMarketingWrapperByClientWidth({
    clientWidth,
    openTitleName,
    showCategoryList,
    btnActive,
}) {
    const { dispatch } = useAppContext();

    const handleDispatch = useCallback((props) => {
        const { name, keyName, sitemapUrl } = props
        dispatch({
            type: 'FILTER_CATEGORY',
            payload: {
                categoryName: name,
                keyName: keyName,
                categorySitemapUrl: sitemapUrl
            }
        });
    }, [dispatch])

    const btnProps = useCallback((index, category) => {
        return {
            key: index,
            type: "button",
            title: category.name,
            name: category.name,
            active: btnActive(category.name),
            callback: () => handleDispatch(category)
        }
    }, [btnActive, handleDispatch])

    const [leftCategoryList, rightCategoryList] = useMemo(() => {
        if (!showCategoryList) return [null, null]
        if (clientWidth === 0 || clientWidth > 786) return [null, null]
        return [
            showCategoryList.slice(0, 2),
            showCategoryList.slice(2, 4)
        ]
    }, [showCategoryList, clientWidth])

    const isDesktopOdMobile = clientWidth > 786
        ? <DeskTopBtnMarketingWrapper
            showCategoryList={showCategoryList}
            btnProps={btnProps} />
        : <MobileBtnMarketingWrapper
            leftCategoryList={leftCategoryList}
            rightCategoryList={rightCategoryList}
            btnProps={btnProps} />

    const isButtonOrHeaderWrapper = openTitleName
        ? <CommonTitle openTitleName={openTitleName} />
        : isDesktopOdMobile

    return isButtonOrHeaderWrapper
}

export default BtnMarketingWrapperByClientWidth 