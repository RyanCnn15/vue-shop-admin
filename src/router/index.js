// methods
import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import store from '@/store';
import { showFullLoading, hideFullLoading } from '@/utils/utils';
// components
import Index from '@/views/index/index.vue';
import Layout from '@/layout/index.vue';
import NotFound from '@/views/error-page/404.vue';
import Login from '@/views/login/index.vue';

// 通用路由
const routes = [
    {
        path: '/',
        component: Layout,
        name: 'Layout',
        children: [{ path: '/', name: 'Index', meta: { title: '首页' }, component: Index }],
    },
    { path: '/login', name: 'Login', meta: { title: '管理员登录' }, component: Login },
    { path: '/:pathMatch(.*)*', name: 'NotFound', meta: { title: '404' }, component: NotFound },
];

// 动态路由
// 这里写了本地的路由表，后端需要传递已有的路由才能动态添加，后期看情况修改
const asyncRoute = [
    { path: '/goods/list', name: 'GoodsList', meta: { title: '购物列表' }, component: () => import('@/views/goods/list.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 批量添加路由
// 这里通过匹配后端传过来的路径，拿到本地写好的动态路由表，然后动态添加，后期看情况修改
const addRoutes = (routeList, parentName = 'Layout') => {
    let hasNewRoutes = false;

    const findAndAddRoutes = arr => {
        arr.forEach(arrItem => {
            const newRoute = asyncRoute.find(asyncRouteItem => asyncRouteItem.path === arrItem.frontpath);
            if (newRoute && !router.hasRoute(newRoute.name)) {
                hasNewRoutes = true;
                router.addRoute(parentName, newRoute);
            }
            if (arrItem.child && arrItem.child.length > 0) {
                findAndAddRoutes(arrItem.child);
            }
        });
    };
    findAndAddRoutes(routeList);

    return hasNewRoutes;
};

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken();

    showFullLoading();
    document.title = to.meta.title;

    // 用户未登录
    if (!token && to.name !== 'Login') {
        ElMessage.error('请先登录');
        // 将用户重定向到登录页面
        next({ name: 'Login' });
    }

    // 用户未登录且要跳转登录页
    if (token && to.name === 'Login') {
        ElMessage.error('请勿重复登录');
        return next({ path: from.path ? from.path : '/' });
    }

    // 用户已登录
    let hasNewRoutes = false;
    if (token) {
        const res = await store.dispatch('getUserInfo');
        hasNewRoutes = addRoutes(res.data.menus);
    }

    // 解决页面刷新后，动态路由导向 404 页面的问题
    hasNewRoutes ? next(to.fullPath) : next();
});

// 路由后置守卫
router.afterEach((to, from) => {
    hideFullLoading();
});

export default router;
