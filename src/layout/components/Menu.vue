<!-- 这里的坑：elmenu 跟 elaside 联动宽度时，动画不正常，这里将组件动画去掉，自己包裹一层写动画 -->
<template>
    <div class="aside" :style="{ width: store.state.asideWidth + 'px' }">
        <el-menu
            width="250px"
            :default-active="defaultActive"
            :collapse="isCollapse"
            :collapse-transition="true"
            unique-opened
            @select="handleSelect"
        >
            <template v-for="(menu, menuIndex) in asideMenus" :key="menuIndex">
                <el-sub-menu v-if="menu.child && menu.child.length > 0" :index="menu.name">
                    <template #title>
                        <el-icon>
                            <component :is="menu.icon"></component>
                        </el-icon>
                        <span>{{ menu.name }}</span>
                    </template>
                    <el-menu-item v-for="(child, childIndex) in menu.child" :key="childIndex" :index="child.frontpath">
                        <el-icon>
                            <component :is="child.icon"></component>
                        </el-icon>
                        <span>{{ child.name }}</span>
                    </el-menu-item>
                </el-sub-menu>

                <el-menu-item v-else :index="menu.frontpath">
                    <el-icon>
                        <component :is="menu.icon"></component>
                    </el-icon>
                    <span>{{ menu.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const isCollapse = computed(() => store.state.asideWidth === 65);
const defaultActive = computed(() => route.path);
const asideMenus = computed(() => store.state.userInfo.menus);

const handleSelect = path => {
    router.push(path);
};
</script>

<style scoped>
.aside {
    @apply fixed bg-light-50 top-60px left-0 bottom-0 overflow-y-auto overflow-x-hidden transition-all duration-200;
}
.aside::-webkit-scrollbar {
    display: none;
}
</style>
