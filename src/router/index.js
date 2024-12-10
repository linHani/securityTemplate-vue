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
    // component: Layout,
    component: () => import('@/views/reception/index'),
    redirect: '/home'
  }
]

// 前台路由
const receptionRoutes = [
  {
    path: '/home',
    name: 'home',
    hidden: true,
    component: () => import('@/views/reception/home/index'),
    meta: { title: '首页' }
  },
  {
    path: '/detail',
    name: 'detail',
    hidden: true,
    component: () => import('@/components/Detail/index.vue'),
    meta: { title: '详情' }
  },
  {
    path: '/scenic',
    name: 'scenic',
    hidden: true,
    component: () => import('@/views/reception/scenic/index.vue'),
    meta: { title: '景点信息' }
  },
  {
    path: '/travel',
    name: 'travel',
    hidden: true,
    component: () => import('@/views/reception/travel/index.vue'),
    meta: { title: '旅游路线' }
  },
  {
    path: '/tavern',
    name: 'tavern',
    hidden: true,
    component: () => import('@/views/reception/tavern/index.vue'),
    meta: { title: '景区酒店' }
  },
  {
    path: '/consult',
    name: 'consult',
    component: () => import('@/views/reception/consult/index.vue'),
    meta: { title: '旅游咨询' }
  },
  {
    path: '/collection',
    name: 'collection',
    hidden: true,
    component: () => import('@/views/reception/collection/index.vue'),
    meta: { title: '我的收藏' }
  },
  {
    path: '/reserve',
    name: 'reserve',
    hidden: true,
    component: () => import('@/views/reception/reserve/index.vue'),
    meta: { title: '我的预定' }
  },
  {
    path: '/refund',
    name: 'refund',
    hidden: true,
    component: () => import('@/views/reception/refund/index.vue'),
    meta: { title: '我的退单' }
  },
  {
    path: '/personal',
    name: 'personal',
    hidden: true,
    component: () => import('@/views/reception/personal/index.vue'),
    meta: { title: '个人中心' }
  }
]

/**
 * 动态路由
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/homePage',
    children: [
      {
        path: 'homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/place-interest',
    component: Layout,
    redirect: '/place-interest',
    children: [
      {
        path: '/place-interest',
        name: '/place-interest',
        component: () => import('@/views/place-interest/index'),
        meta: { title: '景点管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/itinerary',
    component: Layout,
    redirect: '/itinerary',
    children: [
      {
        path: '/itinerary',
        name: '/itinerary',
        component: () => import('@/views/itinerary/index'),
        meta: { title: '线路管理', icon: 'dashboard' }
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
    path: '/information',
    component: Layout,
    redirect: '/information',
    children: [
      {
        path: '/information',
        name: '/information',
        component: () => import('@/views/information/index'),
        meta: { title: '资讯管理', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/hotel-reservation',
    component: Layout,
    redirect: '/hotel-reservation',
    children: [
      {
        path: '/hotel-reservation',
        name: '/hotel-reservation',
        component: () => import('@/views/hotel-reservation/index'),
        meta: { title: '酒店预约', icon: 'dashboard' }
      }
    ]
  },
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
  routes: [...constantRoutes, ...receptionRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
