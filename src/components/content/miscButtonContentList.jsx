import BtnMarketingWrapper from "@components/button/btnMarketingWrapper";
import BtnMarketing from "@components/button/btnMarketing";
import { useAppContext } from "@store/context";

export default function MiscButtonContentList({
  prevInfo,
  nextInfo
}) {
  const { state } = useAppContext();

  const buttonProps = (info, isPrev) => ({
    to: info.sitemapUrl,
    name: isPrev ? '上一篇' : '下一篇',
    className: isPrev ? 'prev' : 'next',
    title: info.title,
    cancelHoverState: state.clientWidth <= 768 ? true : false
  })
  return (
    <BtnMarketingWrapper position="content" >
      {prevInfo && <BtnMarketing {...buttonProps(prevInfo, true)} />}
      {nextInfo && <BtnMarketing {...buttonProps(nextInfo, false)} />}
    </BtnMarketingWrapper>
  );
}
