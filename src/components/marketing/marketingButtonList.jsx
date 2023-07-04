import React from "react";
import { useRouter } from "next/router";
import BtnMarketing from '@components/btnMarketing';
import BtnMarketingWrapper from '@components/btnMarketingWrapper';
import { useAppContext } from "@store/context";



export default function MarketingButtonList({
  categoryList,
  paramName
}) {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

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

  return (
    <>
      <BtnMarketingWrapper position='upper'>
        {paramName == null && showCategoryList ? showCategoryList.map((category, index) => {
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
        })
          : <BtnMarketing
            type="title"
            title={paramName}
            name={paramName}
            cancelHoverState={true}
          />
        }
      </BtnMarketingWrapper>
    </>
  );
}
