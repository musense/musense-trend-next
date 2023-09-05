import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
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
  getTitleContents,
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
type CommonProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL
  const sitemapUrl = params?.sitemapUrl as string
  console.log('🚀 ~ file: index.tsx:98 ~ sitemapUrl:', sitemapUrl)
  let payload = {
    apiUrl: apiUrl,
    sitemapUrl: `${process.env.NEXT_PUBLIC_TREND_SITE}/${sitemapUrl}`,
    _id: null,
    page: 1,
    categoryName: '',
    tagName: '',
  }

  let mainContent

  if (sitemapUrl.indexOf('p_') !== -1) {
    mainContent = await getMainContentBySitemapUrl(payload)
    if (!mainContent) {
      return {
        props: {},
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
          mainImagePath: mainContent.mainImagePath,
        },
      },
    }
  }
  if (sitemapUrl.indexOf('c_') !== -1) {
    //* special case
    if (sitemapUrl === 'c_all_contents.html') {
      mainContent = {
        name: '全部文章',
      }

      const promiseTitleContents = getTitleContents(payload)
      const promiseCategoryList = getCategoryList(payload)
      const promisePopularContents = getPopularContents(payload)

      const { titleContents, categoryList, popularContents } =
        await Promise.all([
          promiseTitleContents,
          promiseCategoryList,
          promisePopularContents,
        ]).then((res) => {
          const response = {
            titleContents: res[0],
            categoryList: res[1],
            popularContents: res[2],
          }
          console.log('🚀 ~ file: index.tsx:62 ~ ]).then ~ response:', response)
          return response
        })

      const commonPageItems = [...titleContents]
      return {
        props: {
          mainTitle: mainContent.name,
          commonPageItems: commonPageItems,
          categoryList: categoryList,
          sitemapUrl: sitemapUrl,
          popularContents: popularContents,
        },
      }
    }

    const categoryList = await getCategoryList(payload)
    mainContent = categoryList.find(
      (category: any) => category.sitemapUrl === sitemapUrl
    )
    payload = {
      ...payload,
      apiUrl: apiUrl,
      categoryName: mainContent.name,
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

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: categoryItems,
        categoryList: categoryList,
        sitemapUrl: sitemapUrl,
        popularContents: popularContents,
        meta: {
          headTitle: categoryInfo.headTitle,
          headDescription: categoryInfo.headDescription,
          headKeyword: categoryInfo.headKeyword,
        },
      },
    }
  }
  if (sitemapUrl?.indexOf('tag_') !== -1) {
    const tagList = await getTagList(payload)
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

    return {
      props: {
        mainTitle: mainContent.name,
        commonPageItems: tagItems,
        sitemapUrl: sitemapUrl,
        popularContents: popularContents,
        meta: {
          headTitle: tagInfo.headTitle,
          headDescription: tagInfo.headDescription,
          headKeyword: tagInfo.headKeyword,
        },
      },
    }
  }

  return {
    props: {},
  }
}

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

  const metaComponent = (
    <Meta
      title={meta?.headTitle || process.env.NEXT_PUBLIC_TITLE}
      description={meta?.headDescription || process.env.NEXT_PUBLIC_DESCRIPTION}
      keywords={meta?.headKeyword || process.env.NEXT_PUBLIC_KEYWORDS}
      canonical={`${process.env.NEXT_PUBLIC_SITE}/trend/${sitemapUrl}`}
      mainImagePath={meta?.mainImagePath || ''}
    />
  )
  const contentPage = (
    <ContentPage
      mainContent={mainContent}
      relatedArticles={relatedArticles}
      popularTagList={popularTagList}
      previousAndNextPage={previousAndNextPage}
    />
  )
  const tagPage = (
    <Marketing
      openTitleName={`# ${mainTitle}`}
      commonPageItems={commonPageItems}
      popularContents={popularContents}
      sitemapUrl={sitemapUrl}
    />
  )
  const marketingPage = (
    <Marketing
      openTitleName={mainTitle}
      commonPageItems={commonPageItems}
      categoryList={categoryList}
      popularContents={popularContents}
      sitemapUrl={sitemapUrl}
    />
  )
  const indexPage = (
    <Index
      commonPageItems={commonPageItems}
      categoryList={categoryList}
      popularContents={popularContents}
    />
  )
  const page = sitemapUrl
    ? sitemapUrl.indexOf('p_') !== -1
      ? contentPage
      : sitemapUrl.indexOf('tag_') !== -1
      ? tagPage
      : marketingPage
    : indexPage

  return <Main meta={metaComponent}>{page}</Main>
}

export default Page
