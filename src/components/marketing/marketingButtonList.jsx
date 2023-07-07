import React from "react";
import BtnMarketing from '@components/btnMarketing';
import BtnMarketingWrapper from '@components/btnMarketingWrapper';
import { useAppContext } from "@store/context";
import useInitial from "@services/useInitial";
import useDispatch from "@services/useDispatch";

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
    if (!categoryList) return null
    return categoryList.filter(category => category.keyName !== 'Uncategorized')
  }, [categoryList])

  const handleDispatch = useDispatch('FILTER_CATEGORY')

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
    if (!showCategoryList) return [null, null]
    if (clientWidth === 0  || clientWidth > 786) return [null, null]
    return [
      showCategoryList.slice(0, 2),
      showCategoryList.slice(2, 4)
    ]
  }, [showCategoryList, clientWidth])

  return clientWidth > 768
    ? paramName === ''
      ? <DeskTopBtnMarketingWrapper
        btnActive={btnActive}
        handleDispatch={handleDispatch}
        showCategoryList={showCategoryList}
      />
      : <CommonTitle paramName={paramName} />
    : paramName === ''
      ? <MobileBtnMarketingWrapper
        btnActive={btnActive}
        handleDispatch={handleDispatch}
        leftCategoryList={leftCategoryList}
        rightCategoryList={rightCategoryList}
      />
      : <CommonTitle paramName={paramName} />
    ;
}

function DeskTopBtnMarketingWrapper({
  showCategoryList,
  btnActive,
  handleDispatch
}) {

  const dispatchProps = (category) => ({
    categoryName: category.name,
    keyName: category.keyName,
    categorySitemapUrl: category.sitemapUrl
  })
  return <BtnMarketingWrapper position='upper'>
    {showCategoryList && showCategoryList.map((category, index) => {
      return (
        <BtnMarketing
          key={index}
          type="button"
          title={category.name}
          name={category.name}
          active={btnActive(category.name)}
          callback={handleDispatch(dispatchProps(category))}
        />
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
  const dispatchProps = (category) => ({
    categoryName: category.name,
    keyName: category.keyName,
    sitemapUrl: category.sitemapUrl
  })
  return (<BtnMarketingWrapper position='upper'>
    <div>
      {leftCategoryList && leftCategoryList.map((category, index) => {
        return <BtnMarketing
          key={index}
          type="button"
          title={category.name}
          name={category.name}
          active={btnActive(category.name)}
          callback={handleDispatch(dispatchProps(category))}
        />;
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
          callback={handleDispatch(dispatchProps(category))}
        />;
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