export default {
  // 设置用户token
  SET_ACCESS_TOKEN(state, token = null) {
    state.token = token
  },
  SET_USER_INFO(state, val) {
    state.userInfo = val
  }
}
