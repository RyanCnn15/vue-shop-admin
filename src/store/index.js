import { createStore } from 'vuex';
import { login, logout, getInfo, updatePassword } from '@/api/manager';
import { setToken, removeToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

const store = createStore({
  state() {
    return {
      userInfo: {},
      asideWidth: 250,
      role: {},
      menus: [],
      ruleNames: []
    };
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    SET_ASIDE_WIDTH(state, payload) {
      state.asideWidth = state.asideWidth === 250 ? 65 : 250;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login({ username, password })
          .then((res) => {
            setToken(res.data.token);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
          .finally(() => {
            removeToken();
          });
      });
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((userInfo) => {
            commit('SET_USER_INFO', userInfo.data);
            resolve(userInfo);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updatePassword({ commit }, payload) {
      return new Promise((resolve, reject) => {
        updatePassword(payload)
          .then((res) => {
            // setToken(res.data.token);
            if (res.data) {
              ElMessage.success('密码修改成功');
            } else {
              ElMessage.error('密码修改失败');
            }
            resolve(userInfo);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
});

export default store;
