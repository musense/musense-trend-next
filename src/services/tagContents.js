import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@services/sitemap';

//* LIST
// export async function getTagSitemapUrls(payload) {
//     const { apiUrl } = payload
//     const response = await instance(apiUrl).get(`/tags?limit=9999&pageNumber=1`)
//         .then(res => res.data)
//         .then(res => res.data.filter((item) =>
//             item.sitemapUrl !== undefined &&
//             // item.status !== "已排程" && item.status !== "草稿" &&
//             item.name !== "未分類"
//         ))
//         .then(res => { console.log("🚀 ~ file: tagContents.js:10 ~ res.sitemapUrl:", res.sitemapUrl); return res })
//         .then(tagList => tagList.filter(content => content.sitemapUrl.indexOf('/tag_') !== -1))
//     const idArray = response.reduce((acc, curr) => {
//         return [...acc, getRenamedContent(curr.sitemapUrl)]
//     }, [])

//     return idArray
// }

//* LIST
export async function getTagList(payload) {
    const { page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags?limit=9999&pageNumber=${page}`)
        .then(res => res.data.data)
        // .then(res => { console.log(`🚀 ~ file: tagContents.js:19 ~ getTagInfo ~ res:`, res); return res })
        .then(res => res.map(tag => {
            return {
                ...tag,
                headTitle: tag.headTitle && tag.headTitle.length > 0
                    ? tag.headTitle : tag.name,
                sitemapUrl: getRenamedContent(tag.sitemapUrl) || '#'
            }
        }))
    // console.log("🚀 ~ file: tagContents.js:7 ~ getTagList ~ response:", response)

    return response
}

//* LIST
export async function getPopularTagList(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/getPopularTags`)
        .then(res => res.data.data)
        // .then(res => { console.log(`🚀 ~ file: tagContents.js:19 ~ getTagInfo ~ res:`, res); return res })
        .then(res => res.map(tag => {
            return {
                ...tag,
                headTitle: tag.name,
                sitemapUrl: getRenamedContent(tag.sitemapUrl) || '#'
            }
        }))
        .then(res => res.map(tag => {
            const {
                name,
                sitemapUrl,
                ...rest
            } = tag
            return {
                name,
                sitemapUrl,
            }
        }))
    console.log("🚀 ~ file: tagContents.js:42 ~ getPopularTagList ~ response:", response)

    return response
}

export async function getTagInfo(payload) {
    const { tagName, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/${tagName}`)
        .then(res => res.data)
        .then(tag => ({
            ...tag,
            headTitle: tag.headTitle && tag.headTitle.length > 0
                ? tag.headTitle || ''
                : tag.name || '',
            headDescription: tag.headDescription || '',
            headKeyword: tag.headKeyword || '',
        }
        ))

    // console.log("🚀 ~ file: tagContents.js:19 ~ getTagInfo ~ response:", response)

    return response
}


//* LIST
export async function getTagContents(payload) {
    // console.log("🚀 ~ file tagContents.js:4 ~ getTagsContent ~ payload:", payload)
    const { tagName, page, apiUrl } = payload
    const response = await instance(apiUrl).get(`/tags/tagSearch/${tagName}?limit=9999&pageNumber=${page}`)
        .then(res => res.data)
        .then(res => { console.log("🚀 ~ file: tagContents.js:61 ~ getTagContents ~ res:", res); return res })
        .then(res => res.data && res.data.length > 0 ? res.data.filter(item =>
            // item.draft === false &&
            item.status !== "已排程" && item.status !== "草稿" &&
            item.categories.name !== "未分類") : [])
        .then(tagContents => tagContents.map(content => {
            if (content.length === 0) {
                return []
            }
            return {
                ...content,
                sitemapUrl: getRenamedContent(content.sitemapUrl) || '#'
            }
        }))
    // .then(res => { console.log("🚀 ~ file: tagContents.js:26 ~ getTagsContent ~ res:", res); return res })
    // console.log("🚀 ~ file: tagContents.js:26 ~ getTagsContent ~ response:", response)

    return response
}