<template>
  <div class="login_main" id="login_main">
    <div class="login_form" v-show="isLogin">
      <!-- Biaoti -->
      <p>叮咚住房</p>
      <el-form
        :model="loginModel"
        :rules="loginRules"
        ref="loginRules"
        label-width="80px"
        hide-required-asterisk
      >
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="loginModel.username" style=""></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="loginModel.password"
            style=""
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码:" class="yzm" prop="vCode">
          <el-input
            type="password"
            v-model="loginModel.vCode"
            style="width: 200px"
          ></el-input>
          <p @click="againCode">
            <img src="@/assets/imgs/recode_img.png" alt="" />
          </p>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button @click="registered">注册</el-button>
          <el-button @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="register_form" v-show="!isLogin">
      <span>注册</span>
      <div class="zx"></div>
      <el-form
        :model="register"
        :rules="regRules"
        ref="registerForm"
        label-width="110px"
      >
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="register.email" style=""></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            type="password"
            v-model="register.password"
            style=""
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码:" prop="againPassword">
          <el-input
            type="password"
            v-model="register.againPassword"
            style=""
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码:" prop="vCode">
          <el-input v-model="register.vCode" style=""></el-input>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button @click="retLogin">返回登陆</el-button>
          <el-button @click="retConfirm">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }

    var checkAgainPassword = (rule, value, callback) => {
      setTimeout(() => {
        console.log(this.register)
        if (value === this.register.password) {
          callback()
        } else {
          callback(new Error('两次输入的密码不一致'))
        }
      }, 100)
    }

    return {
      isLogin: true,
      register: {
        email: '',
        password: '',
        againPassword: '',
        vCode: '',
      },
      regRules: {
        email: [
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            validator: checkEmail,
            message: '请输入正确的邮箱格式',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码',
          },
          {
            //插入正则验证：大小写、数字、至少8位、不常用字符
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
            message: '密码应当至少6位且含有数字、字母',
          },
        ],
        againPassword: [
          {
            required: true,
            validator: checkAgainPassword,
            trigger: 'blur',
          },
        ],
        vCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入验证码',
          },
        ],
      },
      loginModel: {
        username: '',
        password: '',
        vCode: '',
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名',
          },
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入密码',
          },
        ],
        vCode: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入验证码',
          },
        ],
      },
    }
  },
  components: {},
  methods: {
    login() {
      this.$refs.loginRules.validate((valid) => {
        if (!valid) {
          return false
        }
        this.$router.push({
          name: 'Layout',
        })
      })
    },
    registered() {
      this.isLogin = false
    },
    retLogin() {
      this.$refs.registerForm.resetFields()
      this.isLogin = true
    },
    retConfirm() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //重复请求验证码
    againCode() {},
  },
  mounted() {},
}
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

  .login_form,
  .register_form {
    padding: 12px;
    width: 520px;
    height: 428px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(249, 249, 249, 0.9);
    position: absolute;
    z-index: 999;
    border-radius: 8px;
    box-shadow: #fff 0px 2px 15px 0px;

    p {
      font-weight: 300;
      color: rgb(80, 79, 79);
      font-size: 28px;
      margin-bottom: 20px;
    }
  }

  .login_form {
    .el-form {
      padding: 0 24px;

      .form_btn {
        display: flex;
        justify-content: flex-end;
      }
      .yzm {
        display: flex;
        height: 40px;
        align-items: center;
        ::v-deep .el-form-item__content {
          display: flex;
          margin-left: 0 !important;
          align-items: center;
        }
        p {
          margin-left: 20px;
          margin-bottom: 0px;
          width: 140px;
          height: 60px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .register_form {
    flex: 1;

    span {
      font-size: 32px;
      font-weight: 700;
    }

    .zx {
      height: 1px;
      width: 100%;
      background-color: black;
      margin-top: 8px;
      flex-shrink: 0;
    }

    .el-form {
      padding: 0 24px;
      margin-top: 24px;

      .form_btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>