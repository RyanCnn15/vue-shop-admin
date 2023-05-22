import Layout from '@/layout/index.vue';
import Index from '@/views/index/index.vue';
import Login from '@/views/login/index.vue';
import NotFound from '@/views/error-page/404.vue';

// 通用路由
export const defaultRoute = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    children: [{ path: '/', name: 'Index', meta: { title: '首页' }, component: Index }]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '管理员登录' },
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: { title: '404' },
    component: NotFound
  }
];

// 动态路由
// 这里写了本地的路由表，后端需要传递已有的路由才能动态添加，后期看情况修改
export const asyncRoute = [
  {
    path: '/goods/list',
    name: 'GoodsList',
    meta: { title: '购物列表' },
    component: () => import('@/views/goods/list.vue')
  }
];
