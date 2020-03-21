import * as types from './mutations-type'
const state = {
  menu:[]
}
const mutations = {
  [types.SET_MENU](state, array) {
    state.menu = array
  }
}
const getters = {

}
const actions = {
  setMenu({
    commit
  }, array) {
    commit(types.SET_MENU, array)
  },
}
export default {
  state,
  mutations,
  getters,
  actions
}
