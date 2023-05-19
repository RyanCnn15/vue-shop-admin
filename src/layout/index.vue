<template>
    <el-container>
        <el-header class="bg-indigo-700"><Header /></el-header>
        <el-container>
            <el-aside width="200px"><Menu /></el-aside>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import Menu from './components/Menu.vue';
import Header from './components/Header.vue';
</script>
