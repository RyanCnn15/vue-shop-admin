<template>
    <div class="w-full h-full flex justify-center justify-items-center">
        <el-result icon="warning" title="404" sub-title="你找的页面走丢了">
            <template #extra>
                <el-button type="primary" @click="$router.go(-1)">返回</el-button>
            </template>
        </el-result>
    </div>
</template>
<script>
export default {
    name: "",
    data() {
        return {};
    },
    methods: {},
};
</script>