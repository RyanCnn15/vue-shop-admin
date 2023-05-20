<template>
    <el-row class="login">
        <el-col class="login-left" :lg="16" :md="12">
            <div>
                <div class="font-bold text-5xl">欢迎光临</div>
            </div>
        </el-col>
        <el-col class="login-right" :lg="8" :md="12">
            <div class="w-250px flex flex-col justify-center items-center">
                <div class="text-3xl text-gray-800 font-bold">欢迎回来</div>
                <el-divider content-position="center">
                    <span class="text-gray-400">账号密码登录</span>
                </el-divider>
                <el-form
                    class="w-250px"
                    :model="loginForm"
                    ref="loginFormRef"
                    :rules="loginRules"
                    label-width="80px"
                    :inline="false"
                    label-position="top"
                >
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password">
                            <template #prefix>
                                <el-icon><Lock /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="w-full !bg-indigo-500 !border-indigo-500"
                            round
                            type="primary"
                            size="default"
                            :loading="loading"
                            @click="submitForm(loginFormRef)"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();
let loading = ref(false);
const loginFormRef = ref();

const loginForm = reactive({
    username: '',
    password: '',
});

const loginRules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

const submitForm = async formEl => {
    if (!formEl) return;
    await formEl.value.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true;

            store
                .dispatch('login', loginForm)
                .then(() => {
                    ElMessage.success('登录成功');
                    router.push('/');
                })
                .finally(() => {
                    loading.value = false;
                });
        } else {
            console.log('error submit!', fields);
        }
    });
};

// 监听回车事件
const enterKey = e => {
    console.log(e.keyCode === 13);
    if (e.keyCode === 13) submitForm(loginFormRef);
};
onMounted(() => {
    document.addEventListener('keyup', enterKey);
});
onBeforeUnmount(() => {
    document.removeEventListener('keyup', enterKey);
});
</script>
<style scoped>
.login {
    @apply w-full h-full;
}
.login-left {
    @apply flex flex-col justify-center items-center text-light-50 bg-indigo-500;
}
.login-right {
    @apply flex flex-col justify-center items-center;
}
</style>
