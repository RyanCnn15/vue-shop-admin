import request from '@/utils/request';

// 登录
export const login = ({ username, password }) => {
    return request.post('/admin/login', {
        username,
        password,
    });
};

// 获取管理员信息和权限菜单
export const getInfo = () => {
    return request.post('/admin/getinfo');
};
