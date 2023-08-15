import React, { useMemo, useCallback } from "react";
import { useAppContext } from "@store/context";
import BtnMarketingWrapperByClientWidth from './BtnMarketingWrapperByClientWidth'

export default function MarketingButtonList({
  categoryList,
  paramName
}) {

  const { state } = useAppContext();

  const showCategoryList = useMemo(() => {
    if (!categoryList) return null
    return categoryList.filter(category => category.keyName !== 'Uncategorized')
  }, [categoryList])
  console.log("🚀 ~ file: marketingButtonList.jsx:16 ~ showCategoryList ~ showCategoryList:", showCategoryList)



  const btnActive = useCallback((name) => {
    if (!state.categoryName) return false
    return name === state.categoryName
  }, [state.categoryName])

  return <BtnMarketingWrapperByClientWidth
    selectedCategoryName={state.categoryName}
    clientWidth={state.clientWidth}
    paramName={paramName}
    showCategoryList={showCategoryList}
    btnActive={btnActive}
  />
}
