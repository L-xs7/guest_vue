<template>
    <el-container>
        <el-header></el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu class="el-menu-vertical" background-color="#20293A" text-color="#BDC0C6" router
                    active-text-color="#FFFFFF" :default-active="activePath">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>系统配置</span>
                        </template>
                        <el-menu-item index="/layout/region" @click="saveNavState('/layout/region')">
                            <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
                            地区配置
                        </el-menu-item>
                    </el-submenu>



                </el-menu>
            </el-aside>
            <el-main>
                <!-- <transition name="fade-transform" mode="out-in"> -->
                <router-view />
                <!-- </transition> -->
            </el-main>

        </el-container>
    </el-container>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name: 'Latout',
        data() {
            return {
                //被激活的链接地址
                activePath: ''
            }
        },
        methods: {
            //保存侧边栏激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
            }
        },
        created() {
            //赋值侧边栏激活状态
            this.activePath = window.sessionStorage.getItem('activePath')
        }
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
        background-color: #20293A !important;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
        background-color: #F5F7FB;
    }

    .icon {
        font-size: 14px;
        margin-right: 4px;
        position: relative;
        top: 1px;
    }
</style>