<template>
  <div class="tab">
    <el-tabs
      v-model="activeTab"
      type="card"
      @tab-change="handleTabChange"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="tab in tabList"
        :label="tab.title"
        :name="tab.path"
        :closable="tab.path !== '/'"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';

const route = useRoute();
const router = useRouter();
const cookie = useCookies();

const activeTab = ref(route.path);
let tabList = ref([{ title: '后台首页', path: '/' }]);
const initTabList = () => {
  const tabs = cookie.get('tabList');
  tabList.value = tabs || tabList.value;
};
initTabList();

const handleTabChange = (tab) => {
  router.push(tab);
};

const handleTabRemove = (name) => {
  const index = tabList.value.findIndex((tab) => tab.path === name);
  const tabs = tabList.value.filter((tab) => tab.path !== name);
  tabList.value = [...tabs];
  router.push(tabList.value[index - 1]['path']);
};

onBeforeRouteUpdate((to, from, next) => {
  activeTab.value = to.path;
  const routeAlreadyExist = tabList.value.find((tab) => tab.path === to.path);
  if (!routeAlreadyExist) {
    tabList.value.push({
      title: to.meta.title,
      path: to.path
    });
  }
  cookie.set('tabList', tabList.value);
  next();
});
</script>
<style scoped>
.tab {
  @apply p-1 overflow-hidden absolute top-0 left-0 right-0 border border-b-gray-200;
}

:deep(.el-tabs) {
  @apply !h-26px;
}

:deep(.el-tabs__header) {
  @apply !h-26px !border-none !m-0;
}

:deep(.el-tabs__nav) {
  @apply !h-26px !border-none;
}

:deep(.el-tabs__nav-scroll) {
  @apply !mx-2;
}

:deep(.el-tabs__item) {
  @apply !h-26px !leading-26px !border !border-gray-200 bg-white mx-2px rounded-sm;
}

:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  @apply !h-26px !leading-30px text-black border rounded-sm;
}

:deep(.is-disabled) {
  @apply text-gray-300 cursor-not-allowed;
}
</style>
