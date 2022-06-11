import { request } from '@/api/helper'

//登陆

const login = query => {
  return request('post', '/Api/login', query)
}

/**
 * 获取用户信息
 */
const getUserInfo = query => {
  return request('get', 'Api/admin/userInfo')
}

/**
 * 获取图片链接
 */
const getImgUrl = query => {
  return request('post', 'Api/article/getImgUrl', query, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 获取分类列表
 */
const getCateList = query => {
  return request('get', 'Api/cate/cateList', query)
}

/**
 * 添加分类
 */

const addCate = query => {
  return request('post', 'Api/cate/add', query)
}

/**
 * 修改分类信息
 */

const updateCate = query => {
  return request('post', 'Api/cate/update', query)
}

/**
 * 删除分类信息
 */

const deleteCate = query => {
  return request('post', 'Api/cate/delete', query)
}


/**
 * 获取文章列表
 */
 const getArticleList = query => {
  return request('get', 'Api/article/articleList', query)
}

/**
 * 添加文章
 */

 const addArticle = query => {
  return request('post', 'Api/article/add', query)
}

/**
 * 修改文章信息
 */

const updateArticle = query => {
  return request('post', 'Api/article/update', query)
}

/**
 * 删除文章信息
 */

const deleteArticle = query => {
  return request('post', 'Api/article/delete', query)
}
const apiObj = {
  login,
  getUserInfo,
  getCateList,
  getImgUrl,
  updateCate,
  deleteCate,
  addCate,

  getArticleList,
  addArticle,
  updateArticle,
  deleteArticle
}

export default apiObj
