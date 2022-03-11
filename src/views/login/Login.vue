<template>
  <div class="login_main" id="login_main">
    <Background />
    <div class="login_form">
      <el-form label-width="60px">
        <el-form-item label="用户名:">
          <el-input style="width:216px"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input style="width:216px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>注册</el-button>
          <el-button>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Background from './Background.vue'
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Login",
    data() {
      return {

      }
    },
    components: {
      Background
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .login_main {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    background: url(~@/assets/imgs/login_background.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .login_form {
      width: 420px;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(249, 249, 249, 0.9);
      position: absolute;
      z-index: 999;
      border-radius: 8px;
      box-shadow: #fff 0px 2px 15px 0px;
    }
  }
  .el-form{
    .el-form-item{
      &:last-child{
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>