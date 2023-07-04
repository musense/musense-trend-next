import React from "react";
import BtnMarketing from "@components/btnMarketing";
import BtnMarketingWrapper from '@components/btnMarketingWrapper';
import { useAppContext } from "@store/context";


export default function MiscButtonList() {
  const { state, dispatch } = useAppContext();
  return (
    <>
      <BtnMarketingWrapper position='lower'>
        <BtnMarketing
          title="回首頁"
          to={process.env.NEXT_PUBLIC_FRONT_SITE}
          name='回首頁'
        />
       {state.categorySitemapUrl && <BtnMarketing title="看更多文章" name='看更多文章'
          target={"_blank"}
          to={state.categorySitemapUrl}
          callback={() => dispatch({
            type: "SEE_MORE",
            payload: {
              active: true,
              categoryName: state.categoryName,
            }
          })}
        />}
      </BtnMarketingWrapper>
    </>
  );;
}
