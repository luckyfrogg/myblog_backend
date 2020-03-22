const meta = { requiresAuth: true }
/**
 * 在主框架内显示
 */
const frameIn = [
  // 首页
  {
    path: '/',
    component: () => import('@/components/LayoutContainer'),
    redirect: { name: 'article-list' },
    meta: { title: '首页', requiresAuth: true },
    children: [
      {
        path: '/article/list',
        name: 'article-list',
        meta: { title: '文章列表', requiresAuth: true },
        component: () => import('@/components/PageMain/article/ArticleList'),
      },
      {
        path: '/article/create',
        name: 'article-create',
        meta: { title: '添加文章', requiresAuth: true },
        component: () => import('@/components/PageMain/article/ArticleCreate'),
      },
      {
        path: '/cate/list',
        name: 'cate-list',
        meta: { title: '分类列表', requiresAuth: true },
        component: () => import('@/components/PageMain/cate/CateList'),
      },
      {
        path: 'tag/list',
        name: 'tag-list',
        meta: { title: '标签列表', requiresAuth: true },
        component: () => import('@/components/PageMain/tag/TagList'),
      }
    ]
  },
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404')
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: "登录"
    }
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
