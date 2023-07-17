import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Main } from '@components/Main/Main';
import { Meta } from '@layouts/Meta';
import Index from '@components/marketing/Marketing';
import { getCategoryList } from '@services/categoryContents';
import { getPopularContents, getTitleContents } from '@services/titleContents';

type MarketingProps = InferGetStaticPropsType<typeof getStaticProps>;

const Marketing = ({
  commonPageItems,
  categoryList,
  popularContents,
}: MarketingProps) => {
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

  let categoryList, titleContents, commonPageItems, popularContents;
  let payload = {
    apiUrl: apiUrl,
    categoryName: '',
    page: 1,
  };
  titleContents = await getTitleContents(payload);
  categoryList = await getCategoryList(payload);
  popularContents = await getPopularContents(payload);

  commonPageItems = [...titleContents];
  return {
    props: {
      commonPageItems: commonPageItems,
      categoryList: categoryList,
      popularContents: popularContents,
    },
    revalidate: 10,
  };
};
