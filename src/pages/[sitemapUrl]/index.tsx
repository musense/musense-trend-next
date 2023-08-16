import type {
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next'
import { Meta } from '@layouts/Meta'
import { Main } from '@components/Main/Main'

import {
  getTitleContentsByCategory,
  getCategoryList,
} from '@services/categoryContents'
import {
  getCategoryInfo,
  getRelatedArticles,
  getPreviousAndNextPageById,
  getMainContentBySitemapUrl,
  getPopularContents,
} from '@services/titleContents'
import {
  getTagContents,
  getTagInfo,
  getTagList,
  getPopularTagList,
} from '@services/tagContents'
import ContentPage from '@components/content/ContentPage'
import Marketing from '@components/marketing/Marketing'
import Index from '@components/marketing/Marketing'
import { getAllSitemapUrl } from '@services/sitemap'
type CommonProps = InferGetStaticPropsType<typeof getStaticProps>

const Page = ({
  popularContents,
  relatedArticles,
  previousAndNextPage,
  popularTagList,
  sitemapUrl,
  meta,
  mainContent,
  mainTitle,
  commonPageItems,
  categoryList,
}: CommonProps) => {
  console.log('🚀 ~ file: index.tsx:75 ~ sitemapUrl:', sitemapUrl)
  const page = sitemapUrl ? (
    sitemapUrl.indexOf('p_') !== -1 ? (
      <ContentPage
        mainContent={mainContent}
        relatedArticles={relatedArticles}
        popularTagList={popularTagList}
        previousAndNextPage={previousAndNextPage}
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
  )

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
  )
}

export default Page

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const sitemapUrl = params?.sitemapUrl as string
  console.log(
    '🚀 ~ file: index.tsx:98 ~ constgetStaticProps:GetStaticProps= ~ sitemapUrl:',
    sitemapUrl
  )
  let payload = {
    apiUrl: apiUrl,
    sitemapUrl: `${process.env.NEXT_PUBLIC_SITE}/${sitemapUrl}`,
    _id: null,
    page: 0,
    categoryName: '',
    tagName: '',
  }

  let mainContent, categoryList, tagList, commonPageItems

  if (sitemapUrl.indexOf('p_') !== -1) {
    mainContent = await getMainContentBySitemapUrl(payload)
    if (!mainContent) {
      return {
        props: {
          mainTitle: '',
          commonPageItems: '',
          mainContent: '',
          previousAndNextPage: '',
          relatedArticles: '',
          popularTagList: '',
          titleContents: '',
          sitemapUrl: null,
          meta: '',
        },
        revalidate: 10,
      }
    }
    mainContent = {
      ...mainContent,
      name: mainContent.categories.name,
    }
    payload = {
      ...payload,
      _id: mainContent._id,
    }
    const promisePreviousAndNextPage = getPreviousAndNextPageById(payload)
    const promiseRelatedArticles = getRelatedArticles(payload)
    const promisePopularTagList = getPopularTagList(payload)

    const { previousAndNextPage, relatedArticles, popularTagList } =
      await Promise.all([
        promisePreviousAndNextPage,
        promiseRelatedArticles,
        promisePopularTagList,
      ]).then((res) => {
        console.log('🚀 ~ file: index.tsx:160 ~ ]).then ~ res:', res)
        return {
          previousAndNextPage: res[0],
          relatedArticles: res[1],
          popularTagList: res[2],
        }
      })

    return {
      props: {
        mainTitle: mainContent.name,
        mainContent: mainContent,
        previousAndNextPage: previousAndNextPage,
        relatedArticles: relatedArticles,
        popularTagList: popularTagList,
        sitemapUrl: sitemapUrl,
        meta: {
          headTitle: mainContent.headTitle,
          headDescription: mainContent.headDescription,
          headKeyword: mainContent.headKeyword,
        },
      },
      revalidate: 10,
    }
  }
  if (sitemapUrl.indexOf('c_') !== -1) {
    categoryList = await getCategoryList(payload)
    mainContent = categoryList.find(
      (category: any) => category.sitemapUrl === sitemapUrl
    )
    payload = {
      ...payload,
      apiUrl: apiUrl,
      categoryName: mainContent.name,
      page: 1,
    }

    const promiseCategoryItems = getTitleContentsByCategory(payload)
    const promiseCategoryInfo = getCategoryInfo(payload)
    const promisePopularContents = getPopularContents(payload)

    const { categoryItems, categoryInfo, popularContents } = await Promise.all([
      promiseCategoryItems,
      promiseCategoryInfo,
      promisePopularContents,
    ]).then((res) => {
      const response = {
        categoryItems: res[0],
        categoryInfo: res[1],
        popularContents: res[2],
      }
      console.log('🚀 ~ file: index.tsx:200 ~ ]).then ~ response:', response)
      return response
    })

    commonPageItems = [...categoryItems]
    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: commonPageItems,
        categoryList: categoryList,
        sitemapUrl: sitemapUrl,
        popularContents: popularContents,
        meta: {
          headTitle: categoryInfo.headTitle,
          headDescription: categoryInfo.headDescription,
          headKeyword: categoryInfo.headKeyword,
        },
      },
      revalidate: 10,
    }
  }
  if (sitemapUrl?.indexOf('tag_') !== -1) {
    payload = {
      ...payload,
      page: 1,
    }
    tagList = await getTagList(payload)
    mainContent = tagList.find((tag: any) => tag.sitemapUrl === sitemapUrl)
    payload = {
      ...payload,
      tagName: mainContent.name,
    }
    const promiseTagItems = getTagContents(payload)
    const promiseTagInfo = getTagInfo(payload)
    const promisePopularContents = getPopularContents(payload)

    const { tagItems, tagInfo, popularContents } = await Promise.all([
      promiseTagItems,
      promiseTagInfo,
      promisePopularContents,
    ]).then((res) => {
      console.log('🚀 ~ file: index.tsx:258 ~ ]).then ~ res:', res)
      return {
        tagItems: res[0],
        tagInfo: res[1],
        popularContents: res[2],
      }
    })
    commonPageItems = [...tagItems]

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: commonPageItems,
        sitemapUrl: sitemapUrl,
        meta: {
          headTitle: tagInfo.headTitle,
          headDescription: tagInfo.headDescription,
          headKeyword: tagInfo.headKeyword,
        },
        popularContents: popularContents,
      },
      revalidate: 10,
    }
  }

  return {
    props: {},
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  }

  const allSitemapUrl = await getAllSitemapUrl(payload)

  console.log(
    '🚀 ~ file: index.tsx:254 ~ const getStaticPaths:GetStaticPaths= ~ allSitemapUrl:',
    allSitemapUrl
  )
  const paths = allSitemapUrl.map((sitemapUrl: string) => ({
    params: { sitemapUrl },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
