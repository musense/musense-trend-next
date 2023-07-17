import { instance } from "./AxiosInstance";
import { getRenamedContent } from '@services/sitemap';
import { categoryKeyname } from "./categoryKeyname";


/**
 * Returns the selected titleContent
 * 
 * @param {string} _id
 * @param {string} apiUrl
 * @returns response
*/
export async function getTitleContentsByID(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/${_id}`)
    .then(res => res.data)
    .then(mainContent => {
      return {
        ...mainContent,
        headTitle: mainContent.headTitle && mainContent.headTitle.length > 0
          ? mainContent.headTitle : mainContent.title,
        tags: mainContent.tags && mainContent.tags.length > 0 && mainContent.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl)
          }
        }),
        categories: {
          _id: mainContent.categories._id,
          name: mainContent.categories.name,
          sitemapUrl: getRenamedContent(mainContent.categories.sitemapUrl)
        }
      }
    })
  console.log("🚀 ~ file: titleContents.js:9 ~ getTitleContentsByID ~ response:", response)
  return response
}

/**
 * Returns all titleContents
 * 
 * @param {string} apiUrl
 * @returns response
 */
export async function getTitleContents(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(encodeURI(`/editor?limit=9999&pageNumber=1`))
    // .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.data)
    .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.data && res.data.length > 0
      ? res.data.filter(item =>
        item.status !== "已排程" && item.status !== "草稿" &&
        item.categories.name !== "未分類")
      : []
    )
    .then(res => { console.log("🚀 ~ file: titleContents.js:59 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.map(content => {
      if (content.length === 0) {
        return []
      }
      return {
        ...content,
        headTitle: content.headTitle && content.headTitle.length > 0
          ? content.headTitle : content.title,
        tags: content.tags && content.tags.length > 0 ? content.tags.map(tag => {
          return {
            ...tag,
            sitemapUrl: getRenamedContent(tag.sitemapUrl)
          }
        }) : null,
        categories: {
          _id: content.categories._id,
          name: content.categories.name,
          sitemapUrl: getRenamedContent(content.categories.sitemapUrl)
        },
        sitemapUrl: getRenamedContent(content.sitemapUrl),
      }
    }))
  // .then(res => { console.log(res); return res })
  return response
}

/**
 * Returns a list a idArray of all titleContents
 * 
 * @param {string} apiUrl
 * @returns idArray 
 */
export async function getAllTitleContentsAndGetOnlyID(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(encodeURI(`/editor?limit=9999&pageNumber=1`))
    // .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })
    .then(res => res.data.data)
  // .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })
  // .then(res => res.filter(item => item.draft === false))
  // .then(res => { console.log("🚀 ~ file: titleContents.js:48 ~ getTitleContents ~ res:", res); return res })

  const idArray = response.reduce((acc, curr) => {
    return [...acc, curr._id]
  }, [])
  return idArray
}

/**
 * Returns the array of sitemap urls for all titleContent pages
 * 
 * @param {string} apiUrl
 * @returns idArray
 */
export async function getEditorSitemapUrls(payload) {
  const { apiUrl } = payload
  const response = await instance(apiUrl).get(encodeURI(`/editor?limit=9999&pageNumber=1`))
    .then(res => res.data)
    // .then(res => res.filter(item => item.draft === false))
    // .then(res => { console.log("🚀 ~ file: titleContents.js:113 ~ getEditorSitemapUrls ~ res:", res); return res; })
    //唯二不產URL的只有uncategorized && 未發布
    .then(res => res.data.filter(item => item.categories.name !== "未分類"))

  // .then(res => { console.log("🚀 ~ file: titleContents.js:116 ~ getEditorSitemapUrls ~ res:", res); return res; })


  const idArray = response.reduce((acc, curr) => {
    return [...acc, getRenamedContent(curr.sitemapUrl)]
  }, [])
  return idArray
}

/**
 * Returns the category info including the title, description, and keywords, etc.
 * 
 * @param {string} categoryName
 * @param {string} apiUrl
 * @returns response
 */
export async function getCategoryInfo(payload) {
  const { categoryName, apiUrl } = payload
  const response = await instance(apiUrl).get(`/category/${categoryKeyname.get(categoryName)}`)
    .then(res => res.data)
    .then(category => ({
      ...category,
      headTitle: category.headTitle && category.headTitle.length > 0
        ? category.headTitle : category.name,
    })
    )
  // console.log("🚀 ~ file: titleContents.js:31 ~ getCategoryInfo ~ response:", response)
  return response
}

/**
 * Returns a list a idArray of titleContents by categoryName
 * 
 * @param {string} categoryName
 * @param {number} page
 * @param {string} apiUrl
 * @returns idArray 
 */
export async function getTitleContentsByCategoryAndGetOnlyID(payload) {
  const { categoryName, page, apiUrl } = payload
  const response = await instance(apiUrl).get(`/categories/${categoryName}?limit=9999&pageNumber=${page}`)
    .then(res => res.data)
  const { data } = response
  const idArray = data.reduce((acc, curr) => {
    return [...acc, curr._id]
  }, [])
  return idArray
}


/**
 * Returns the relatedArticles of the selected titleContent
 * 
 * @param {string} _id
 * @param {string} apiUrl
 * @returns response
 */
export async function getRelatedArticles(payload) {
  const { _id, apiUrl } = payload
  const response = await instance(apiUrl).get(`/editor/relatedArticles/${_id}`)
    .then(res => res.data)
    // .then(res => { console.log("🚀 ~ file: titleContents.js:176 ~ getRelatedArticles ~ res:", res); return res })
    .then(res => res.data.filter(item =>
      item.hidden !== true ||
      item.categories.name !== "未分類"
    ))
    .then(relatedArticles => relatedArticles.map(article => {
      return {
        ...article,
        sitemapUrl: getRenamedContent(article.sitemapUrl)
      }
    }))
  // .then(res => { console.log(res); return res })
  return response
}


/**
 * Returns the popular articles by the page views
 * 
 * @param {string} apiUrl
 * @returns response
 */
export async function getPopularContents(payload) {
  const { apiUrl } = payload
  try {
    const response = await instance(apiUrl).get(`/editor/popular?pageNumber=1&limit=6&popular=1`)
      .then(res => res.data)
      // .then(res => { console.log("🚀 ~ file: titleContents.js:198 ~ getPopularContents ~ res:", res); return res })
      .then(res => res.data.filter(item =>
        item.hidden !== true ||
        item.categories.name !== "未分類"
      ))
      .then(popularContents => popularContents.map(content => {
        return {
          ...content,
          sitemapUrl: getRenamedContent(content.sitemapUrl)
        }
      }))
    // .then(res => { console.log("🚀 ~ file: titleContents.js:209 ~ getPopularContents ~ res:", res); return res })
    return response
  } catch (error) {
    console.log("🚀 ~ file: titleContents.js:210 ~ getPopularContents ~ error:", error)
    return null
  }

}

/**
 * A Patch API that increment the pageViews of the selected titleContent
 *
 * @param {string} apiUrl
 * @param {string} _id
 * @returns response
*/
export async function pageViewByContent(payload) {
  const { apiUrl, _id } = payload
  let response
  try {
    response = await instance(apiUrl).patch(`/editor/incrementPageview/${_id}`)
      .then(res => res.data.data)
    // .then(res => { console.log("🚀 ~ file: titleContents.js:225 ~ res:", res); return res })
  } catch (error) {
    console.log("🚀 ~ file: titleContents.js:225 ~ error:", error)
  }

  return response
}


