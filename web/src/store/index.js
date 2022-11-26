/*
 * @Author: kyrle
 * @Date: 2022-11-08 21:17:47
 * @LastEditTime: 2022-11-19 19:23:29
 * @FilePath: \web\src\store\index.js
 * @Description:  
 */
import { createStore } from 'vuex'
import ModuleUser  from './user'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
  }
})
