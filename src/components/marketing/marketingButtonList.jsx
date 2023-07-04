import React from "react";
import BtnMarketing from '@components/btnMarketing';
import BtnMarketingWrapper from '@components/btnMarketingWrapper';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";


export default function MarketingButtonList({
  categoryList,
  paramName
}) {

  const { state, dispatch } = useAppContext();
  useInitial({
    state,
    dispatch
  });
  const showCategoryList = React.useMemo(() => {
    if (!categoryList) return
    return categoryList.filter(category => category.keyName !== 'Uncategorized')
  }, [categoryList])
  console.log("🚀 ~ file: marketingButtonList.jsx:20 ~ showCategoryList ~ showCategoryList:", showCategoryList)

  const handleDispatch = (category) => React.useCallback(() => {
    dispatch({
      type: 'FILTER_CATEGORY',
      payload: {
        categoryName: category.name,
        keyName: category.keyName,
        sitemapUrl: category.sitemapUrl
      }
    })
  }, [dispatch])

  const btnActive = React.useCallback((name) => {
    if (!state) return false
    return name === state.categoryName
  }, [state])

  return <BtnMarketingWrapperByClientWidth
    clientWidth={state.clientWidth}
    paramName={paramName}
    showCategoryList={showCategoryList}
    btnActive={btnActive}
    handleDispatch={handleDispatch}
  />
}

function BtnMarketingWrapperByClientWidth({
  clientWidth,
  paramName,
  showCategoryList,
  btnActive,
  handleDispatch,
}) {

  const [leftCategoryList, rightCategoryList] = React.useMemo(() => {
    if (clientWidth > 786) return [null, null]
    return [
      showCategoryList.slice(0, 2),
      showCategoryList.slice(2, 4)
    ]
  }, [showCategoryList, clientWidth])
  console.log("🚀 ~ file: marketingButtonList.jsx:65 ~ const[leftCategoryList,rightCategoryList]=React.useMemo ~ leftCategoryList:", leftCategoryList)
  console.log("🚀 ~ file: marketingButtonList.jsx:65 ~ const[leftCategoryList,rightCategoryList]=React.useMemo ~ rightCategoryList:", rightCategoryList)

  return clientWidth > 768
    ? paramName == null
      ? <DeskTopBtnMarketingWrapper
        btnActive={btnActive}
        handleDispatch={handleDispatch}
        showCategoryList={showCategoryList}
      />
      : <CommonTitle paramName={paramName} />
    : paramName == null
      ? <MobileBtnMarketingWrapper
        btnActive={btnActive}
        handleDispatch={handleDispatch}
        leftCategoryList={leftCategoryList}
        rightCategoryList={rightCategoryList}
      />
      : <CommonTitle paramName={paramName} />;



}

function DeskTopBtnMarketingWrapper({
  showCategoryList,
  btnActive,
  handleDispatch
}) {
  return <BtnMarketingWrapper position='upper'>
    {showCategoryList.map((category, index) => {
      return (
        <BtnMarketing
          key={index}
          type="button"
          title={category.name}
          name={category.name}
          active={btnActive(category.name)}
          callback={handleDispatch(category)} />
      );
    })}
  </BtnMarketingWrapper>;
}

function MobileBtnMarketingWrapper({
  leftCategoryList,
  rightCategoryList,
  btnActive,
  handleDispatch
}) {
  return (<BtnMarketingWrapper position='upper'>
    <div>
      {leftCategoryList && leftCategoryList.map((category, index) => {
        return <BtnMarketing
          key={index}
          type="button"
          title={category.name}
          name={category.name}
          active={btnActive(category.name)}
          callback={handleDispatch(category)} />;
      })}
    </div>
    <div>
      {rightCategoryList && rightCategoryList.map((category, index) => {
        return <BtnMarketing
          key={index}
          type="button"
          title={category.name}
          name={category.name}
          active={btnActive(category.name)}
          callback={handleDispatch(category)} />;
      })}
    </div>
  </BtnMarketingWrapper>);
}

function CommonTitle({ paramName }) {
  return <BtnMarketingWrapper position='upper'>
    <BtnMarketing
      type="title"
      title={paramName}
      name={paramName}
      cancelHoverState={true}
    />
  </BtnMarketingWrapper>;
}