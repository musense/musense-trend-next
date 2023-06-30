import React from "react";
import { useRouter } from "next/router";
import BtnMarketing from '@components/btnMarketing';
import BtnMarketingWrapper from '@components/btnMarketingWrapper';
import { useAppContext } from "@store/context";



export default function MarketingButtonList({
  categoryList
}) {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const showCategoryList = React.useMemo(() => {
    if (!categoryList) return
    return categoryList.filter(category => category.keyName !== 'Uncategorized')
  }, [categoryList])
  
  React.useEffect(() => {
    let category
    if (!showCategoryList) return
    if (!state.categoryName) {
      category = showCategoryList.find(category => category.name = '廣告投放代理')
      dispatch({
        type: 'SET_CATEGORY_NAME',
        payload: {
          categoryName: '廣告投放代理'
        }
      })
      router.push(`/${category.sitemapUrl}`, undefined, { shallow: true })
    }
  }, [showCategoryList, state]);

  const handleDispatch = (category) => React.useCallback(() => {
    dispatch({
      type: 'SET_CATEGORY_NAME',
      payload: {
        categoryName: category.name
      }
    })
    router.push(`/${category.sitemapUrl}`)
  }, [router, dispatch])

  const btnActive = React.useCallback((name) => {
    if (!state) return
    return name === state.categoryName
  }, [state])

  return (
    <>
      <BtnMarketingWrapper position='upper'>
        {showCategoryList && showCategoryList.map((category, index) => {
          return (
            <BtnMarketing
              key={index}
              type="button"
              title={category.name}
              name={category.name}
              active={btnActive(category.name)}
              callback={handleDispatch(category)}
            />
          )
        })}
      </BtnMarketingWrapper>
    </>
  );
}
