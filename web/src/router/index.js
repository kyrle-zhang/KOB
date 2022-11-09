/*
 * @Author: kyrle
 * @Date: 2022-11-08 21:17:36
 * @LastEditTime: 2022-11-09 11:39:07
 * @FilePath: \web\src\router\index.js
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import PKIndexView from '../views/pk/PKIndexView.vue'
import RanklistIndexView from '../views/ranklist/RanklistIndexView.vue'
import RecordlistIndexView from '../views/recordlist/RecordlistIndexView.vue'
import BotlistIndexView from '../views/user/bot/BotlistIndexView.vue'
import NotFoundView from '../views/404/NotFoundView.vue'

// url路由
const routes = [
  {
    path: '/home/',
    name : 'home',
    redirect: '/pk/index/'
  },
  {
    path: '/pk/index/', //路由的url
    name: 'PKIndexView', //路由的页面名称(在前端渲染使用)
    component: PKIndexView //路由的真实页面
  },
  {
    path: '/ranklist/index/',
    name: 'RanklistIndexView',
    component: RanklistIndexView
  },
  {
    path: '/recordlist/index/',
    name: 'RecordlistIndexView',
    component: RecordlistIndexView
  },
  {
    path: '/user/bot/',
    name: 'BotlistIndexView',
    component: BotlistIndexView
  },
  {
    path: '/404/',
    name: 'NotFoundView',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
