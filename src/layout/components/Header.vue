<template>
    <div class="w-full h-full flex justify-between items-center">
        <a href="/" class="block flex items-center space-x-2">
            <img src="../../assets/vue.svg" alt="" />
            <span class="text-light-100">后台管理</span>
        </a>
        <div class="block flex items-center space-x-2">
            <el-icon><FullScreen /></el-icon>
            <el-dropdown>
                <el-button type="primary">
                    <img src="" alt="" />
                    <span>username</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item>Action 4</el-dropdown-item>
                        <el-dropdown-item>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
