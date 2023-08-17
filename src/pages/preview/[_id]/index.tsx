import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { Main } from '@components/Main/Main'
import { Meta } from '@layouts/Meta'
import ContentPage from '@components/content/ContentPage'
import { getPreviewContentByID } from '@services/titleContents'
import { getPopularTagList } from '@services/tagContents'

type PreviewProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const _id = params?._id as string
  const payload = {
    apiUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    _id: _id,
  }

  try {
    const promiseMainContent = getPreviewContentByID(payload)
    const promisePreviousAndNextPage = new Promise((res) => {
      const response = {
        nextEditor: {
          _id: '123',
          sitemapUrl: '#',
          title: 'CTA是什麼? 一個好的CTA怎麼做？',
        },
        previousEditor: {
          _id: '321',
          sitemapUrl: '#',
          title: '口碑行銷是業配？掌握口碑行銷5T策略，提升品牌信任感！',
        },
      }

      res(response)
    })
    const promisePopularTagList = getPopularTagList(payload)

    const { mainContent, previousAndNextPage, popularTagList } =
      await Promise.all([
        promiseMainContent,
        promisePreviousAndNextPage,
        promisePopularTagList,
      ]).then((res) => {
        const response = {
          mainContent: res[0],
          previousAndNextPage: res[1],
          popularTagList: res[2],
        }
        console.log('🚀 ~ file: index.jsx:52 ~ ]).then ~ response:', response)
        return response
      })
    return {
      props: {
        params,
        mainContent,
        previousAndNextPage,
        popularTagList,
        meta: {
          headTitle: mainContent.headTitle,
          headDescription: mainContent.headDescription,
          headKeyword: mainContent.headKeyword,
        },
      },
    }
  } catch (error) {
    // Handle any errors during the data fetching process
    console.error('Error fetching data:', error)
    return {
      props: {
        mainContent: null,
        previousAndNextPage: null,
        popularTagList: null,
        meta: null,
      },
    }
  }
}

const PreviewPage = ({
  mainContent,
  previousAndNextPage,
  popularTagList,
  meta,
}: PreviewProps) => {
  const metaComponent = (
    <Meta
      title={meta.headTitle}
      description={meta.headDescription}
      keywords={meta.headKeyword}
    />
  )
  const contentPage = (
    <ContentPage
      mainContent={mainContent}
      previousAndNextPage={previousAndNextPage}
      relatedArticles={[]}
      popularTagList={popularTagList}
      isPreview={true}
    />
  )

  return <Main meta={metaComponent}>{contentPage}</Main>
}

export default PreviewPage
