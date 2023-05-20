<template>
    <el-container>
        <el-header class="bg-indigo-700"><Header /></el-header>
        <el-container>
            <el-aside :width="store.state.asideWidth + 'px'"><Menu /></el-aside>
            <!-- <el-aside width="250px"><Menu /></el-aside> -->
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import Menu from './components/Menu.vue';
import Header from './components/Header.vue';

const store = useStore();
</script>

<style scoped>
.el-aside {
    @apply transition-all duration-200;
}
</style>
