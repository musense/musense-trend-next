import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@services/sitemap';
import { categoryKeyname } from "./categoryKeyname";


//* LIST
export async function getCategoryList(payload) {
    const { apiUrl } = payload
    const response = await instance(apiUrl).get(`/categories`)
        .then(res => res.data)
        // .then(res => { console.log(`🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ res:`, res); return res })
        .then(res => res.data.filter((item) => item.name !== "未分類"))
        .then(categoryList => categoryList.map((category) => {
            return {
                ...category,
                headTitle: category.headTitle && category.headTitle.length > 0
                    ? category.headTitle : category.name,
                sitemapUrl: getRenamedContent(category.sitemapUrl) || '#',
            }
        }))
        .then(categoryList => categoryList.map((category) => {
            const {
                name,
                keyName,
                sitemapUrl,
                ...rest
            } = category

            return {
                name,
                keyName,
                sitemapUrl,
            }
        }))



    // console.log("🚀 ~ file: categoryContents.js:11 ~ getCategoryList ~ response:", response)
    return response
}

//* LIST
// export async function getCategorySitemapUrls(payload) {
//     const { apiUrl } = payload
//     const response = await instance(apiUrl).get(`/categories`)
//         .then(res => res.data)
//         .then(res => { console.log("🚀 ~ file: categoryContents.js:35 ~ getCategorySitemapUrls ~ res:", res); return res })
//         .then(res => res.data.filter((item) =>
//             item.status !== "已排程" && item.status !== "草稿" &&
//             item.name !== "未分類"
//         ))
//     // .then(res => { console.log(res); return res })
//     const idArray = response.reduce((acc, curr) => {
//         return [...acc, getRenamedContent(curr.sitemapUrl)]
//     }, [])
//     return idArray
// }


//* LIST
export async function getTitleContentsByCategory(payload) {
    const { categoryName, page, apiUrl } = payload
    // console.log("🚀 ~ file: categoryContents.ts:63 ~ getTitleContentsByCategory ~ categoryName:", categoryName)
    console.log("🚀 ~ file: categoryContents.ts:63 ~ getTitleContentsByCategory ~ categoryKeyname.get(categoryName):", categoryKeyname.get(categoryName))
    const response = await instance(apiUrl).get(`/searchCategory/${categoryKeyname.get(categoryName)}?limit=9999&pageNumber=${page}`)
        .then(res => res.data)
        .then(res => { console.log("🚀 ~ file: categoryContents.ts:66 ~ getTitleContentsByCategory ~ res:", res); return res })
        .then(res => res.data && res.data.length > 0 ? res.data.filter(item =>
            // item.draft === false && 
            item.status !== "已排程" && item.status !== "草稿"
            // && item.categories.name !== "未分類"
        ) : [])
        .then(categoryContents => categoryContents.map((content) => {
            if (content.length === 0) {
                return []
            }
            return {
                ...content,
                sitemapUrl: getRenamedContent(content.sitemapUrl) || '#'
            }
        }))
    // .then(res => { console.log(res); return res })
    return response
}