import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import { Meta } from '@layouts/Meta';
import { Main } from '@components/Main/Main';

import {
  getTitleContentsByCategory,
  getCategoryList,
  getCategorySitemapUrls,
} from '@services/categoryContents';
import {
  getCategoryInfo,
  getEditorSitemapUrls,
  getPopularContents,
  getRelatedArticles,
  getTitleContents,
  getTitleContentsByID,
} from '@services/titleContents';
import {
  getTagContents,
  getTagInfo,
  getTagList,
  getPopularTagList,
  getTagSitemapUrls,
} from '@services/tagContents';
import ContentPage from '@components/content/ContentPage';
import Marketing from '@components/marketing/Marketing';
import Index from '@components/marketing/Marketing';

type CommonProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page = ({
  titleContents,
  popularContents,
  relatedArticles,
  popularTagList,
  sitemapUrl,
  meta,
  mainContent,
  mainTitle,
  commonPageItems,
  categoryList,
}: CommonProps) => {
  console.log('🚀 ~ file: index.tsx:75 ~ sitemapUrl:', sitemapUrl);
  const page = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        mainContent={mainContent}
        titleContents={titleContents}
        relatedArticles={relatedArticles}
        popularTagList={popularTagList}
      />
    ) : sitemapUrl.indexOf('tag_') !== -1 ? (
      <Marketing
        paramName={`# ${mainTitle}`}
        commonPageItems={commonPageItems}
        popularContents={popularContents}
        sitemapUrl={sitemapUrl}
      />
    ) : (
      <Marketing
        paramName={mainTitle}
        commonPageItems={commonPageItems}
        categoryList={categoryList}
        popularContents={popularContents}
        sitemapUrl={sitemapUrl}
      />
    )
  ) : (
    <Index
      commonPageItems={commonPageItems}
      categoryList={categoryList}
      popularContents={popularContents}
    />
  );

  return (
    <Main
      meta={
        <Meta
          title={meta.headTitle}
          description={meta.headDescription}
          keywords={meta.headKeyword}
          canonical={`${process.env.NEXT_PUBLIC_SITE}/${sitemapUrl}`}
        />
      }
    >
      {page}
    </Main>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const sitemapUrl = params?.sitemapUrl as string;
  let payload = {
    apiUrl: apiUrl,
    _id: null,
    page: 0,
    categoryName: '',
    tagName: '',
  };
  let titleContents,
    content,
    mainContent,
    relatedArticles,
    popularTagList,
    categoryList,
    categoryItems,
    categoryInfo,
    tagList,
    tagItems,
    tagInfo,
    editorTitleList,
    popularContents;

  if (sitemapUrl.indexOf('p_') !== -1) {
    titleContents = await getTitleContents(payload);
    content = titleContents.find(
      (content: any) => content.sitemapUrl === sitemapUrl
    );
    if (!content) {
      return {
        props: {
          mainTitle: '',
          commonPageItems: '',
          mainContent: '',
          relatedArticles: '',
          popularTagList: '',
          titleContents: '',
          sitemapUrl: null,
          meta: '',
        },
        revalidate: 10,
      };
    }
    payload = {
      ...payload,
      _id: content._id,
    };
    mainContent = await getTitleContentsByID(payload);
    mainContent = {
      ...mainContent,
      name: mainContent.categories.name,
    };
    relatedArticles = await getRelatedArticles(payload);
    popularTagList = await getPopularTagList(payload);
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: '',
        categoryList: '',
        mainContent: mainContent,
        relatedArticles: relatedArticles,
        popularTagList: popularTagList,
        titleContents: titleContents,
        sitemapUrl: sitemapUrl,
        meta: mainContent,
        popularContents: '',
      },
      revalidate: 10,
    };
  }
  if (sitemapUrl.indexOf('c_') !== -1) {
    categoryList = await getCategoryList(payload);
    mainContent = categoryList.find(
      (category: any) => category.sitemapUrl === sitemapUrl
    );
    payload = {
      ...payload,
      apiUrl: apiUrl,
      categoryName: mainContent.name,
      page: 1,
    };
    categoryItems = await getTitleContentsByCategory(payload);
    categoryInfo = await getCategoryInfo(payload);
    popularContents = await getPopularContents(payload);
    editorTitleList = [...categoryItems];
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        categoryList: categoryList,
        mainContent: '',
        relatedArticles: '',
        popularTagList: '',
        titleContents: '',
        sitemapUrl: sitemapUrl,
        meta: categoryInfo,
        popularContents: popularContents,
      },
      revalidate: 10,
    };
  }
  if (sitemapUrl?.indexOf('tag_') !== -1) {
    payload = {
      ...payload,
      page: 1,
    };
    tagList = await getTagList(payload);
    mainContent = tagList.find((tag: any) => tag.sitemapUrl === sitemapUrl);
    payload = {
      ...payload,
      tagName: mainContent.name,
    };
    tagItems = await getTagContents(payload);
    tagInfo = await getTagInfo(payload);
    popularContents = await getPopularContents(payload);
    editorTitleList = [...tagItems];

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        categoryList: '',
        mainContent: '',
        relatedArticles: '',
        popularTagList: '',
        titleContents: '',
        sitemapUrl: sitemapUrl,
        meta: tagInfo,
        popularContents: popularContents,
      },
      revalidate: 10,
    };
  }

  return {
    props: {
      mainTitle: '',
      commonPageItems: '',
      mainContent: '',
      relatedArticles: '',
      popularTagList: '',
      titleContents: '',
      sitemapUrl: null,
      meta: '',
      popularContents: '',
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  };
  const editorPromise = getEditorSitemapUrls(payload);
  const tagPromise = getTagSitemapUrls(payload);
  const categoryPromise = getCategorySitemapUrls(payload);
  const sitemapUrl = await Promise.all([
    editorPromise,
    categoryPromise,
    tagPromise,
  ]).then((res) => res.flat());
  console.log(
    '🚀 ~ file: index.tsx:254 ~ const getStaticPaths:GetStaticPaths= ~ sitemapUrl:',
    sitemapUrl
  );
  const paths = sitemapUrl.map((url) => ({
    params: { sitemapUrl: url },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
