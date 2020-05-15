<template>
  <div class="login-container">
    <div class="header">
      <div class="inner">
        <div class="logo">
          <img src="../../assets/logo_login.png" alt="">
          <span>商业保理系统</span>
        </div>
      </div>
    </div>

    <div class="bd">
      <div class="inner">
        <div class="banner">
          <img src="../../assets/pic_lg.jpg" alt="">
        </div>

        <div class="main">
          <h3>登录</h3>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <el-form-item prop="username">
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
<!--                <span class="show-pwd" @click="showPwd">-->
<!--                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
<!--                </span>-->
              </el-form-item>
            </el-tooltip>

            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item prop="verifyCode">
                  <el-input
                    ref="username"
                    v-model="loginForm.verifyCode"
                    placeholder="验证码"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <img
                  v-show="verifyCodeUrl!=null"
                  :src="verifyCodeUrl"
                  class="yzcode"
                  @click="changeVerifyCode"
                  title="点击更换验证码"
                />
              </el-col>
            </el-row>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>
          </el-form>
        </div>
      </div>
    </div>

    <div class="foot">
      <p> Copyright ©2020 北京中金云创软件有限公司 版权所有</p>
      <p> 京ICP备14035122号-1</p>
      <p> 为了不影响您的正常使用，建议使用IE11及以上版本、chrome45及以上、火狐55及以上版本或360浏览器9.1及以上版本。</p>
    </div>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    return {
      verifyTime: new Date().getTime(),
      verifyCodeBaseUrl: '/oauth/piccode',
      loginForm: {
        username: '',
        password: '',
        verifyCode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'change', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'change', message: '请输入密码' }],
        verifyCode: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  computed: {
    verifyCodeUrl: function() {
      return `${this.verifyCodeBaseUrl}?dt=${this.verifyTime}`
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    changeVerifyCode() {
      this.verifyTime = new Date().getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
  .inner{
    width: 1180px;
    display: flex;
    align-items: center;
  }
  .header{
    height: 106px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    .logo{
      display: flex;
      align-items: center;
      img{
        width: 131px;
        height: 35px;
      }
      span{
        color: #666;
        font-size: 15px;
        border-left: 1px solid #999;
        margin-left: 12px;
        padding-left: 12px;
      }
    }
  }

  .bd{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #33a1e6;
    .banner{
      width: 630px;
      img{
        width: 630px;
        height: 360px;
      }
    }
    .main{
      width: 420px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid #dfdfdf;
      position: relative;
      padding: 20px 40px;
      top: -55px;
      h3{
        padding: 35px 0 20px;
        margin: 0;
        font-weight: 400;
        font-size: 21px;
        color: #666;
        text-align: center;
        letter-spacing: 3px;
      }
      .yzcode{
        height: 35px;
        cursor: pointer;
      }
    }
  }

  .foot{
    padding: 30px 0 30px;
    text-align: center;
    p{
      padding: 0;
      margin: 0;
      line-height: 24px;
      font-size: 14px;
      color: #666;
    }
  }
</style>

<style lang="scss">
  .login-container{
    background-color: #E3E4E9;
    height: 100%;
    .el-input__inner{
      border: none;
      background-color: #e8e8e8;
    }
  }
</style>
