<template>
    <div id="header">
        <div class="header-left">
            <a href="/" class="logo">
                <img src="../../assets/vue.svg" alt="" />
                <span class="text-light-50">后台管理</span>
            </a>
            <el-icon class="icon-btn"><fold /></el-icon>
        </div>

        <div class="header-right">
            <el-tooltip effect="dark" content="刷新" placement="bottom">
                <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
            </el-tooltip>
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <full-screen v-if="!isFullscreen" />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommand">
                <div class="flex items-center text-light-50 space-x-2">
                    <el-avatar :size="25" :src="store.state.userInfo.avatar" />
                    <span>{{ store.state.userInfo.username }}</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <el-drawer ref="formDrawerRef" v-model="showDrawer" title="修改密码" append-to-body destroyOnClose>
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input type="password" v-model="form.oldpassword" placeholder="请输入旧密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="showDrawer = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useFullscreen } from '@vueuse/core';

const store = useStore();
const router = useRouter();
const { isFullscreen, toggle } = useFullscreen();

const form = reactive({
    oldpassword: '',
    password: '',
    repassword: '',
});
const rules = reactive({
    oldpassword: [
        {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '新密码不能为空',
            trigger: 'blur',
        },
    ],
    repassword: [
        {
            required: true,
            message: '确认密码不能为空',
            trigger: 'blur',
        },
        {
            validator: (rule, value, callback) => {
                return value === form.password;
            },
            message: '确认密码必须与新密码一致',
            trigger: 'blur',
        },
    ],
});
const formRef = ref();
const handleSubmit = () => {
    formRef.value.validate((valid, fields) => {
        console.log(valid);
        console.log(form);
        if (!valid) return;
        store.dispatch('updatePassword', form);
        showDrawer.value = false;
        formRef.value.resetFields();
    });
};

const handleRefresh = () => location.reload();

const showDrawer = ref(false);
// 分发用户菜单操作
const handleCommand = command => {
    const commandFn = {
        logout: handleLogout,
        rePassword: () => (showDrawer.value = true),
    }[command];
    commandFn && commandFn();
};
const handleLogout = () => {
    ElMessageBox.confirm('是否要退出登录', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            store.dispatch('logout').finally(() => {
                router.push('/login');
            });
            console.log(store);
            ElMessage({
                type: 'success',
                message: '已退出登录',
            });
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消',
            });
        });
};
</script>

<style scoped>
#header {
    @apply w-full h-full flex justify-between items-center;
}

#header .icon-btn {
    @apply flex justify-center items-center text-light-50;
    width: 50px;
    height: 60px;
    cursor: pointer;
}

#header .icon-btn:hover {
    @apply bg-indigo-600;
}

#header .header-left,
#header .header-right {
    @apply h-full flex items-center space-x-4;
}

#header .header-left .logo {
    @apply flex items-center space-x-4;
}

#header .header-right .dropdown {
    height: 60px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>
