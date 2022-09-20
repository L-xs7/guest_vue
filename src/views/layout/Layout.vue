<template>
  <el-container>
    <!-- <el-header></el-header> -->
    <el-container>
      <el-aside width="230px">
        <div class="logo">
          <svg-icon icon-class="logo" class-name="logoSvg"></svg-icon>
          <span style="user-select: none">Ding</span>
        </div>
        <el-menu
          class="el-menu-vertical"
          background-color="#20293A"
          text-color="#BDC0C6"
          router
          active-text-color="#fff"
          :default-active="activePath"
          @select="menuSelHandle"
        >
        <!-- 测试提交 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统配置</span>
            </template>
            <el-menu-item index="/layout/region">
              <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
              地区配置
            </el-menu-item>
            <el-menu-item index="/layout/menu">
              <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
              菜单配置
            </el-menu-item>
            <el-menu-item index="/layout/role">
              <!-- <svg-icon icon-class="home" class-name="icon"></svg-icon> -->
              权限配置
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
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
      activePath: "/layout/region",
    };
  },
  methods: {
    menuSelHandle(val) {
      window.sessionStorage.setItem("indexPath", val);
    },
  },
  created() {
    if (window.sessionStorage.getItem("indexPath")) {
      //赋值侧边栏激活状态
      this.activePath = window.sessionStorage.getItem("indexPath");
    }
  },
};
</script>

<style lang="scss">
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
}

.icon {
  font-size: 14px;
  margin-right: 4px;
  position: relative;
  top: 1px;
}
</style>