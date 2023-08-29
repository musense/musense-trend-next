import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { Main } from '@components/Main/Main'
import { Meta } from '@layouts/Meta'
import Index from '@components/marketing/Marketing'
import { getCategoryList } from '@services/categoryContents'
import { getPopularContents, getTitleContents } from '@services/titleContents'

type MarketingProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps: GetServerSideProps = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL

    let payload = {
        apiUrl: apiUrl,
        categoryName: '',
        page: 1,
    }

    const promiseTitleContents = getTitleContents(payload)
    const promiseCategoryList = getCategoryList(payload)
    const promisePopularContents = getPopularContents(payload)

    const { titleContents, categoryList, popularContents } = await Promise.all([
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
            commonPageItems: commonPageItems,
            categoryList: categoryList,
            popularContents: popularContents,
        },
    }
}

const Marketing = ({
    commonPageItems,
    categoryList,
    popularContents,
}: MarketingProps) => {
    const metaComponent = (
        <Meta
            title={process.env.NEXT_PUBLIC_TITLE || ''}
            description={process.env.NEXT_PUBLIC_DESCRIPTION || ''}
            keywords={process.env.NEXT_PUBLIC_KEYWORDS || ''}
            canonical={process.env.NEXT_PUBLIC_SITE}
        />
    )
    const indexPage = (
        <Index
            commonPageItems={commonPageItems}
            categoryList={categoryList}
            popularContents={popularContents}
        />
    )
    return <Main meta={metaComponent}>{indexPage}</Main>
}

export default Marketing
