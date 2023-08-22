import React from "react";
import BtnMarketing from "@components/button/btnMarketing";
import BtnMarketingWrapper from '@components/button/btnMarketingWrapper';
import { useAppContext } from "@store/context";

export default function MiscButtonList({ hasSitemapUrl }) {
  const { state, dispatch } = useAppContext();
  return (
    <>
      <BtnMarketingWrapper position='lower'>
        <BtnMarketing
          title="回首頁"
          to={state.mainSiteHref}
          name={state.mainSiteHref === '/' ? '返回' : '回首頁'}
        />
        {hasSitemapUrl === false &&
          <BtnMarketing
            title="看更多文章"
            name='看更多文章'
            to={state.categorySitemapUrl}
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
