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
  getTagSitemapUrls,
} from '@services/tagContents';
import ContentPage from '@components/content/index';
import Marketing from '@components/marketing/index';
import Index from '@components/marketing/index';

type CommonProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page = ({
  titleContents,
  popularContents,
  relatedArticles,
  sitemapUrl,
  meta,
  mainContent,
  mainTitle,
  commonPageItems,
  categoryList,
}: CommonProps) => {
  // console.log('🚀 ~ file: index.tsx:45 ~ mainTitle:', mainTitle);
  // console.log('🚀 ~ file: index.tsx:44 ~ popularContents:', popularContents);
  // console.log('🚀 ~ file: index.tsx:41 ~ meta:', meta);

  const page = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        mainContent={mainContent}
        titleContents={titleContents}
        relatedArticles={relatedArticles}
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
  // console.log(
  //   '🚀🚀🚀🚀🚀🚀 ~ file: index.tsx:42 ~ getStaticProps:GetStaticProps= ~ sitemapUrl:',
  //   sitemapUrl
  // );
  // console.log(
  //   "🚀🚀🚀🚀🚀🚀 ~ file: index.tsx:42 ~ getStaticProps:GetStaticProps= ~ sitemapUrl.indexOf('p_'):",
  //   sitemapUrl.indexOf('p_')
  // );
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
    // console.log(
    //   '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ titleContents:',
    //   titleContents
    // );
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
    // console.log(
    //   '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
    //   mainContent
    // );

    relatedArticles = await getRelatedArticles(payload);
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: '',
        categoryList: '',
        mainContent: mainContent,
        relatedArticles: relatedArticles,
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
    // console.log(
    //   '🚀 ~ file: index.tsx:173 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
    //   mainContent
    // );
    payload = {
      ...payload,
      apiUrl: apiUrl,
      categoryName: mainContent.name,
      page: 1,
    };
    categoryItems = await getTitleContentsByCategory(payload);
    categoryInfo = await getCategoryInfo(payload);
    popularContents = await getPopularContents(payload);
    // console.log(
    //   '🚀 ~ file: index.tsx:63 ~ const getStaticProps:GetStaticProps= ~ categoryItems:',
    //   categoryItems
    // );
    editorTitleList = [...categoryItems];
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: editorTitleList,
        categoryList: categoryList,
        mainContent: '',
        relatedArticles: '',
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
    // console.log(
    //   '🚀 ~ file: index.tsx:161 ~ const getStaticProps:GetStaticProps= ~ tagList:',
    //   tagList
    // );
    mainContent = tagList.find((tag: any) => tag.sitemapUrl === sitemapUrl);
    // console.log(
    //   '🚀 ~ file: index.tsx:164 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
    //   mainContent
    // );

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
      titleContents: '',
      sitemapUrl: null,
      meta: '',
      popularContents: '',
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const navItems = ['lottery', 'sports', 'poker', 'matka', 'casino'];
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
    '🚀 ~ file: index.astro:40 ~ getStaticPaths ~ sitemapUrl:',
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
