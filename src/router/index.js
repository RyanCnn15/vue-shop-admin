import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/index/index.vue';
import NotFound from '@/views/error-page/404.vue';
import Login from '@/views/login/index.vue';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import store from '@/store';
import Layout from '@/layout/index.vue';

const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [{ path: '', name: 'Login', meta: { title: '首页' }, component: Index }],
    },
    { path: '/login', name: 'Login', component: Login },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const token = getToken();

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
    if (token) {
        store.dispatch('getUserInfo');
    }

    next();
});

export default router;
