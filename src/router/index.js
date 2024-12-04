import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
 roles: ['admin','editor']    control the page roles (you can set multiple roles)
 title: 'title'               the name show in sidebar and breadcrumb (recommend set)
 icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
 breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
 activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
 }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  }
]

/**
 * 动态路由
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userPersonal',
    name: 'user',
    meta: { title: '用户', icon: 'user' },
    children: [
      {
        path: 'personal',
        name: 'personal',
        component: () => import('@/views/user/personal.vue'),
        meta: { title: '个人中心', icon: 'nested' }
      },
      {
        path: 'adminList',
        name: 'adminList',
        component: () => import('@/views/user/adminManage.vue'),
        meta: { title: '管理员管理', icon: 'table', roles: ['管理员'] }
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/user/userManage.vue'),
        meta: { title: '用户管理', icon: 'table', roles: ['管理员'] }
      }
    ]
  },
  {
    path: '/scenicSpot',
    component: Layout,
    redirect: '/scenicSpot/userPersonal',
    name: 'scenicSpot',
    meta: { title: '景点门票', icon: 'table' },
    children: [
      {
        path: 'scenicSpotList',
        name: 'scenicSpotList',
        component: () => import('@/views/scenicSpot/scenicSpotManage.vue'),
        meta: { title: '景点门票管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/hotel',
    component: Layout,
    redirect: '/hotel/userPersonal',
    name: 'hotel',
    meta: { title: '酒店住宿', icon: 'table' },
    children: [
      {
        path: 'hotelList',
        name: 'hotelList',
        component: () => import('@/views/hotel/hotelManage.vue'),
        meta: { title: '酒店住宿管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/userPersonal',
    name: 'system',
    meta: { title: '系统管理', icon: 'table' },
    children: [
      {
        path: 'carouselImageList',
        name: 'carouselImageList',
        component: () => import('@/views/carouselImage/carouselImageManage.vue'),
        meta: { title: '轮播图管理', icon: 'nested' }
      }
    ]
  },

  // 404 页面必须放置在最后一个页面
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
