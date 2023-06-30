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
import Index from '@components/index/index';
import ContentPage from '@components/content/index';
import Marketing from '@components/marketing/index';

type CommonProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page = ({
  titleContents,
  popularContents,
  sitemapUrl,
  meta,
  mainContent,
  mainTitle,
  commonPageItems,
  categoryList,
}: CommonProps) => {
  // console.log('🚀 ~ file: index.tsx:46 ~ commonPageItems:', commonPageItems);
  // console.log('🚀 ~ file: index.tsx:41 ~ sitemapUrl:', sitemapUrl);
  // console.log('🚀 ~ file: index.tsx:41 ~ meta:', meta);

  const page = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        mainContent={mainContent}
        titleContents={titleContents}
      />
    ) : (
      <Marketing
        mainTitle={mainTitle}
        commonPageItems={commonPageItems}
        categoryList={categoryList}
      />
    )
  ) : (
    <Marketing
      mainTitle={mainTitle}
      commonPageItems={commonPageItems}
      categoryList={categoryList}
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
    editorTitleList;

  if (sitemapUrl.indexOf('p_') !== -1) {
    titleContents = await getTitleContents(payload);
    console.log(
      '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ titleContents:',
      titleContents
    );
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
    console.log(
      '🚀 ~ file: index.tsx:115 ~ const getStaticProps:GetStaticProps= ~ mainContent:',
      mainContent
    );

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
      },
      revalidate: 10,
    };
  }
  if (sitemapUrl.indexOf('c_') !== -1) {
    categoryList = await getCategoryList(payload);
    mainContent = categoryList.find(
      (category: any) => category.sitemapUrl === sitemapUrl
    );
    console.log(
      '🚀 ~ file: index.tsx:173 ~ constgetStaticProps:GetStaticProps= ~ mainContent:',
      mainContent
    );
    payload = {
      ...payload,
      apiUrl: apiUrl,
      categoryName: mainContent.name,
      page: 1,
    };
    categoryItems = await getTitleContentsByCategory(payload);
    categoryInfo = await getCategoryInfo(payload);
    console.log(
      '🚀 ~ file: index.tsx:63 ~ constgetStaticProps:GetStaticProps= ~ categoryItems:',
      categoryItems
    );
    editorTitleList = [...categoryItems];
    return {
      props: {
        mainTitle: '',
        commonPageItems: editorTitleList,
        categoryList: categoryList,
        mainContent: '',
        relatedArticles: '',
        titleContents: '',
        sitemapUrl: sitemapUrl,
        meta: categoryInfo,
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
  //   const tagPromise = getTagSitemapUrls(payload);
  const categoryPromise = getCategorySitemapUrls(payload);
  const sitemapUrl = await Promise.all([
    editorPromise,
    categoryPromise,
    // tagPromise,
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
