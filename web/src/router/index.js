/*
 * @Author: kyrle
 * @Date: 2022-11-08 21:17:36
 * @LastEditTime: 2022-11-22 08:46:36
 * @FilePath: \web\src\router\index.js
 * @Description: 
 */
import { createRouter, createWebHistory } from 'vue-router'
import PKIndexView from '../views/pk/PKIndexView.vue'
import RanklistIndexView from '../views/ranklist/RanklistIndexView.vue'
import RecordlistIndexView from '../views/recordlist/RecordlistIndexView.vue'
import BotlistIndexView from '../views/user/bot/BotlistIndexView.vue'
import NotFoundView from '../views/404/NotFoundView.vue'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView.vue'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView.vue'
import store from '../store/index'

// url路由
const routes = [
  {
    path: '/home/',
    name : 'home',
    redirect: '/pk/index/',
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/pk/index/', //路由的url
    name: 'pk_index', //路由的页面名称(在前端渲染使用)
    component: PKIndexView, //路由的真实页面
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/ranklist/index/',
    name: 'ranklist_index',
    component: RanklistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/recordlist/index/',
    name: 'recordlist_index',
    component: RecordlistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/user/bot/',
    name: 'botlist_index',
    component: BotlistIndexView,
    meta: {
      requestAuth: true,
    }
  },
  {
    path: '/user/account/login/',
    name: 'user_account_login',
    component: UserAccountLoginView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/user/account/register/',
    name: 'user_account_register',
    component: UserAccountRegisterView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/404/',
    name: 'notfound',
    component: NotFoundView,
    meta: {
      requestAuth: false,
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404/'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.requestAuth && !store.state.user.is_login) {
    next({name: 'user_account_login'});
  }else{
    next();
  }
})

export default router
