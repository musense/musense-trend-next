import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Main } from '@components/Main/Main';
import { Meta } from '@layouts/Meta';
import Index from '@components/marketing/index';
import { getCategoryList } from '@services/categoryContents';
import { getPopularContents, getTitleContents } from '@services/titleContents';

type MarketingProps = InferGetStaticPropsType<typeof getStaticProps>;

const Marketing = ({
  commonPageItems,
  categoryList,
  popularContents,
}: MarketingProps) => {
  // console.log(
  //   '🚀 ~ file: index.tsx:20 ~ Marketing ~ commonPageItems:',
  //   commonPageItems
  // );
  // console.log('🚀 ~ file: index.tsx:20 ~ Marketing ~ mainTitle:', mainTitle);
  return (
    <Main
      meta={
        <Meta
          title={process.env.NEXT_PUBLIC_TITLE || ''}
          description={process.env.NEXT_PUBLIC_DESCRIPTION || ''}
          keywords={process.env.NEXT_PUBLIC_KEYWORDS || ''}
          canonical={process.env.NEXT_PUBLIC_SITE}
        />
      }
    >
      <Index
        commonPageItems={commonPageItems}
        categoryList={categoryList}
        popularContents={popularContents}
      />
    </Main>
  );
};

export default Marketing;

export const getStaticProps: GetStaticProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  let categoryList, titleContents, editorTitleList, popularContents;
  let payload = {
    apiUrl: apiUrl,
    categoryName: '',
    page: 1,
  };
  titleContents = await getTitleContents(payload);
  categoryList = await getCategoryList(payload);
  popularContents = await getPopularContents(payload);
  // console.log("🚀 ~ file: index.tsx:63 ~ constgetStaticProps:GetStaticProps= ~ categoryList:", categoryList)

  editorTitleList = [...titleContents];
  return {
    props: {
      commonPageItems: editorTitleList,
      categoryList: categoryList,
      popularContents: popularContents,
    },
    revalidate: 10,
  };
};
