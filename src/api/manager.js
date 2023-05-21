import request from '@/utils/request'

// 登录
export const login = ({ username, password }) => {
  return request.post('/admin/login', {
    username,
    password,
  })
}

// 退出登录
export const logout = () => request.post('/admin/logout')

// 获取管理员信息和权限菜单
export const getInfo = () => request.post('/admin/getinfo')

// 修改密码
export const updatePassword = ({ oldpassword, password, repassword }) => {
  return request.post('/admin/updatepassword', {
    oldpassword,
    password,
    repassword,
  })
}
