import React, { useCallback, useMemo } from "react";
import {
    DeskTopBtnMarketingWrapper,
    MobileBtnMarketingWrapper,
    CommonTitle
} from "./marketingButtonElements";

function BtnMarketingWrapperByClientWidth({
    selectedCategoryName,
    clientWidth,
    paramName,
    showCategoryList,
    btnActive,
    handleDispatch,
}) {

    const dispatchProps = (category) => ({
        categoryName: category.name,
        keyName: category.keyName,
        categorySitemapUrl: category.sitemapUrl
    })

    const btnProps = useCallback((index, category) => {
        return {
            key: index,
            type: "button",
            title: category.name,
            name: category.name,
            active: btnActive(category.name),
            callback: handleDispatch(dispatchProps(category))
        }
    }, [btnActive, handleDispatch, dispatchProps])

    const [leftCategoryList, rightCategoryList] = useMemo(() => {
        if (!showCategoryList) return [null, null]
        if (clientWidth === 0 || clientWidth > 786) return [null, null]
        return [
            showCategoryList.slice(0, 2),
            showCategoryList.slice(2, 4)
        ]
    }, [showCategoryList, clientWidth])


    return clientWidth > 768
        ? paramName === ''
            ? <DeskTopBtnMarketingWrapper
                selectedCategoryName={selectedCategoryName}
                showCategoryList={showCategoryList}
                btnProps={btnProps}
            />
            : <CommonTitle paramName={paramName} />
        : paramName === ''
            ? <MobileBtnMarketingWrapper
                selectedCategoryName={selectedCategoryName}
                leftCategoryList={leftCategoryList}
                rightCategoryList={rightCategoryList}
                btnProps={btnProps}
            />
            : <CommonTitle paramName={paramName} />
        ;
}

export default BtnMarketingWrapperByClientWidth 