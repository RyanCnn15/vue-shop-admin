import store from '@/store';
import { getToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import { showFullLoading, hideFullLoading } from '@/utils/utils';
import { asyncRoute } from './list';

// 批量添加路由函数
// 这里通过匹配后端传过来的路径，拿到本地写好的动态路由表，然后动态添加，后期看情况修改
const addRoutes = (router, routeList, parentName = 'Layout') => {
  let hasNewRoutes = false;

  const findAndAddRoutes = (arr) => {
    arr.forEach((arrItem) => {
      const newRoute = asyncRoute.find(
        (asyncRouteItem) => asyncRouteItem.path === arrItem.frontpath
      );
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
export const routerBeforeEach = (router) => {
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
      hasNewRoutes = addRoutes(router, res.data.menus);
    }

    // 解决页面刷新后，动态路由导向 404 页面的问题
    hasNewRoutes ? next(to.fullPath) : next();
  });
};

// 路由后置守卫
export const routerAfterEach = (router) => {
  router.afterEach((to, from) => {
    hideFullLoading();
  });
};
