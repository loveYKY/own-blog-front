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

const apiObj = {
  login,
  getUserInfo,
  getCateList,
  getImgUrl
}

export default apiObj
