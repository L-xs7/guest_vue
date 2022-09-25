<template>
  <el-container>
    <!-- <el-header></el-header> -->
    <el-container>
      <el-aside width="230px">
        <div class="logo">
          <svg-icon icon-class="logo" class-name="logoSvg"></svg-icon>
          <span style="user-select: none">Ding</span>
        </div>
        <el-menu class="el-menu-vertical" background-color="#20293A" text-color="#BDC0C6" router
          active-text-color="#fff" :default-active="activePath" @select="menuSelHandle">
          <!-- 测试提交 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统配置</span>
            </template>
            <el-menu-item index="/config/region">
              <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
              地区配置
            </el-menu-item>
            <el-menu-item index="/config/menu">
              <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
              菜单配置
            </el-menu-item>
            <el-menu-item index="/config/role">
              <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
              权限配置
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="header_div">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>系统配置</el-breadcrumb-item>
            <el-breadcrumb-item>地区配置</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="item in breadCrumbList" :to="item.isMenu ? false :{path: item.path}"
              :key="item.name">{{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="tx">
            <el-popover placement="top-start" visible-arrow title="" popper-class="tx_Menu" width="120" trigger="click">
              <img slot="reference" src="@/assets/imgs/tx.jpeg" alt="">
              <div slot class="popMenu">
                <span>个人中心</span>
                <span @click="loggedOut">退出登陆</span>
              </div>
            </el-popover>
          </div>
        </div>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Latout",
    data() {
      return {
        //被激活的链接地址
        activePath: "/config/region",
        breadCrumbList: []
      };
    },
    watch: {
      $route: {
        immediate: true,
        handler(val) {
          // console.log(val.matched)
          if (!val.matched) {
            return
          }
          let breadCrumbList = []
          val.matched.forEach(item => {
            let obj = {}
            obj.name = item.meta.name
            obj.path = item.path
            obj.isMenu = item.meta.isMenu
            breadCrumbList.push(obj)
          })
          this.breadCrumbList = breadCrumbList
        }

      }
    },
    methods: {
      menuSelHandle(val) {
        window.sessionStorage.setItem("indexPath", val);
      },
      //退出登陆
      loggedOut() {
        this.$router.push('/')
      }
    },
    created() {
      if (window.sessionStorage.getItem("indexPath")) {
        //赋值侧边栏激活状态
        this.activePath = window.sessionStorage.getItem("indexPath");
      }
    },
  };
</script>

<style lang="scss" scoped>
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #20293a !important;
    text-align: center;
    line-height: 0px;
    display: flex;
    flex-direction: column;

    .logo {
      min-height: 56px;
      padding: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-right: 23px;

      .logoSvg {
        font-size: 70px;
        color: red;
        position: relative;
        top: -2px;
      }

      span {
        color: #fff;
        font-size: 26px;
      }
    }
  }

  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    background-color: #f5f7fb;
    display: flex;
    flex-direction: column;

    .header_div {
      width: 100%;
      height: 48px;
      margin-bottom: 12px;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 0 12px;

      .tx {
        margin-left: auto;
        cursor: pointer;

        img {
          width: 38px;
          height: 38px;
          border-radius: 4px;
        }
      }
    }
  }

  .icon {
    font-size: 14px;
    margin-right: 4px;
    position: relative;
    top: 1px;
  }
</style>
<style lang="scss">
  .tx_Menu {
    padding-left: 0 !important;
    padding-right: 0 !important;
    // background-color: #f5f7fb;
    min-width: 30px !important;

    .popMenu {
      display: flex;
      flex-direction: column;

      span {
        line-height: 40px;
        text-align: center;

        &:hover {
          background-color: #f5f7fb;
        }
      }
    }
  }
</style>