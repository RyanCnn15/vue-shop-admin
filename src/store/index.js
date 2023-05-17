import { createStore } from 'vuex';
import { login, getInfo } from '@/api/manager';
import { setToken } from '@/utils/auth';
import { ElMessage } from 'element-plus';

const store = createStore({
    state() {
        return {
            userInfo: {},
        };
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        },
    },
    actions: {
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login({ username, password })
                    .then(res => {
                        setToken(res.data.token);
                        resolve(res);
                    })
                    .catch(err => {
                        ElMessage.error(err.msg);
                        reject(err);
                    });
            });
        },
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo()
                    .then(userInfo => {
                        commit('setUserInfo', userInfo.data);
                        resolve(userInfo);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
    },
});

export default store;
