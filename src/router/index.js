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

const routes = [
    {
        path: '/',
        component: Layout,
        children: [{ path: '/', name: 'Index', meta: { title: '首页' }, component: Index }],
    },
    { path: '/login', name: 'Login', meta: { title: '管理员登录' }, component: Login },
    { path: '/:pathMatch(.*)*', name: 'NotFound', meta: { title: '404' }, component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

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

    // 用户已登录，自动获取信息
    if (token) {
        store.dispatch('getUserInfo');
    }

    next();
});

// 路由后置守卫
router.afterEach((to, from) => {
    hideFullLoading();
});

export default router;
