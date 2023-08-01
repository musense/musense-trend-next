// import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { Main } from '@components/Main/Main';
import { Meta } from '@layouts/Meta';
import ContentPage from '@components/content/ContentPage';
import { getCategoryList } from '@services/categoryContents';
import {
  getPopularContents,
  getPreviewContentByID,
  getRelatedArticles,
  getTitleContents,
  getTitleContentsByID,
} from '@services/titleContents';
import { getPopularTagList } from '@services/tagContents';

// type PreviewPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PreviewPage = ({
  mainContent,
  titleContents,
  relatedArticles,
  popularTagList,
  meta,
}) => {
  console.log("🚀 ~ file: index.jsx:39 ~ titleContents:", titleContents)
  return (
    <Main
      meta={
        meta && (
          <Meta
            title={meta.headTitle}
            description={meta.headDescription}
            keywords={meta.headKeyword}
          />)
      }
    >
      <ContentPage
        mainContent={mainContent}
        titleContents={titleContents}
        relatedArticles={relatedArticles}
        popularTagList={popularTagList}
        isPreview
      />
    </Main>
  );
};

export default PreviewPage;

export const getServerSideProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const _id = params?._id;
  let payload = {
    apiUrl: apiUrl,
    _id: _id,
  };
  let titleContents, mainContent, relatedArticles, popularTagList;

  try {
    titleContents = await getTitleContents(payload);
    console.log("🚀 ~ file: index.jsx:61 ~ getServerSideProps ~ titleContents:", titleContents)
    // get preview content
    mainContent = await getPreviewContentByID(payload);
    console.log("🚀 ~ file: index.jsx:64 ~ getServerSideProps ~ mainContent:", mainContent)
    // relatedArticles = await getRelatedArticles(payload);
    relatedArticles = await new Promise((resolve, reject) => { resolve([]) });
    popularTagList = await getPopularTagList(payload);
    return {
      props: {
        mainContent,
        titleContents,
        relatedArticles,
        popularTagList,
        meta: mainContent,
      },
    };
  }
  catch (error) {
    // Handle any errors during the data fetching process
    console.error('Error fetching data:', error);
    return {
      props: {
        mainContent: null,
        titleContents: null,
        relatedArticles: null,
        popularTagList: null,
        meta: null,
      }
    };
  }
};
