<template>
  <div class="login_main" id="login_main">
    <div class="login_form">
      <p>叮咚住房</p>
      <el-form label-width="80px">
        <el-form-item label="用户名:">
          <el-input style="width: 276px"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input style="width: 276px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button>注册</el-button>
          <el-button @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {};
  },
  components: {},
  methods: {
    login() {
      this.$router.push({
        name: "Layout",
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.login_main {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: url(@/assets/imgs/login_background2.webp);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login_form {
    p {
      font-weight: 700;
      color: rgb(80, 79, 79);
      font-size: 28px;
      margin-bottom: 20px;
    }
    width: 520px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(249, 249, 249, 0.9);
    position: absolute;
    z-index: 999;
    border-radius: 8px;
    box-shadow: #fff 0px 2px 15px 0px;
  }
}
</style>