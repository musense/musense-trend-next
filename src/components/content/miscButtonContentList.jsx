import BtnMarketingWrapper from "../btnMarketingWrapper";
import BtnMarketing from "../btnMarketing";
import { allData } from '@assets/mockData'

export default function MiscButtonContentList({
  prevInfo,
  nextInfo
}) {


  return (
    <BtnMarketingWrapper position="content" >
      {prevInfo && <BtnMarketing to={`/${prevInfo.sitemapUrl}`} name='上一篇' title={prevInfo.title} />}
      {nextInfo && <BtnMarketing to={`/${nextInfo.sitemapUrl}`} name='下一篇' title={nextInfo.title} />}
    </BtnMarketingWrapper>
  );
}
