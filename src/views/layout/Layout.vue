<template>
    <el-container>
        <el-header>Header</el-header>

        <el-container>
            <el-aside width="200px"> <router-link :to="{name:'Region'}"><span style="font-size: 12px;">布局-->地区配置</span></router-link></el-aside>
            <el-main>
                <!-- <transition name="fade-transform" mode="out-in"> -->
                    <router-view />
                <!-- </transition> -->
            </el-main>

        </el-container>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Latout'
    }
</script>

<style>
    .el-header,
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
        background-color: #F5F7FB;
    }
</style>