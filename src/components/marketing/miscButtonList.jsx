import React, { useLayoutEffect, useState } from "react";
import BtnMarketing from "@components/button/btnMarketing";
import BtnMarketingWrapper from '@components/button/btnMarketingWrapper';
import { useAppContext } from "@store/context";

export default function MiscButtonList({ hasSitemapUrl }) {
  const { state, dispatch } = useAppContext();
  console.log("🚀 ~ file: miscButtonList.jsx:9 ~ MiscButtonList ~ state.mainSiteHref:", state.mainSiteHref)

  const backName = state.mainSiteHref === '/' ? "回首頁" : "返回"
  return (
    <>
      <BtnMarketingWrapper position='lower'>
        <BtnMarketing
          title={backName}
          to={state.mainSiteHref || ''}
          name={backName}
        />
        {hasSitemapUrl === false &&
          <BtnMarketing
            title="看更多文章"
            name='看更多文章'
            to={`/trend/${state.categorySitemapUrl}`}
            callback={() => dispatch({
              type: "SEE_MORE",
              payload: {
                active: true,
                categoryName: state.categoryName,
                keyName: state.keyName,
              }
            })}
          />
        }
      </BtnMarketingWrapper>
    </>
  );;
}
