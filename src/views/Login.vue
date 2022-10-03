<template>
  <div class="login">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <div class="loginTop">
      <h1>欢迎登陆</h1>
    </div>
    <div class="loginContent">
      <form action="" ref="formRef">
        <input type="tel" placeholder="请输入手机号码" v-model="phone" class="tel">
        <div class="checked">
          <input type="text" placeholder="请输入验证码" v-model="code" class="verification">
          <button type="button" class="Code" @click="getCode" :disabled="attcode" v-if="showBtn">获取验证码</button>
          <button class="Code" disabled v-else>{{codeMsg}}</button>
        </div>
        <button type="button" @click="submitForm">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from '@/request/api/home.js'
// import { mapActions } from 'vuex'
import { sendCode, byCode } from '@/request/api/home.js'

export default {
  data() {
    return {
      // 获取验证码按钮是否禁用
      attcode: false,
      // 获取验证码按钮是否展示
      showBtn: true,
      codeMsg: '获取验证码',
      // 倒计时
      codeSec: 60,
      phone: '',
      code: ''
    }
  },
  // mounted() {
  //   this.errorMsg()
  // },
  methods: {
    // 错误提示信息
    errorMsg() {
      this.$notify({
        message: '电话或验证码错误！'
      })
    },
    // 短信发送成功提示信息
    successSendMsg() {
      this.$notify({
        message: '短信发送成功！'
      })
    },
    // 登录成功提示信息
    successLoginMsg() {
      this.$notify({
        message: '登录成功！'
      })
    },
    // 提交登录表单
    async submitForm() {
      let byCodeData = await byCode(this.phone, this.code)
      console.log(byCodeData)
      if (byCodeData.data.code === 200) {
        this.successLoginMsg()
        this.$store.commit('updateIsLogin', true)
        this.$store.commit('updateToken', byCodeData.data.token)
        let result = await getLoginUser()
        console.log(result)
        this.$store.commit('updateUser', result)
        localStorage.setItem('token', true)
        this.$router.push('/infoUser')
        // 保存信息到 Vuex 跳转页面
      } else {
        this.errorMsg()
      }
    },
    // 发送验证码
    async getCode() {
      // 调用 sendCode 发送验证码
      let sendCodeData = await sendCode(this.phone)
      console.log(sendCodeData)
      if (sendCodeData.code === 200) {
        //this.successSendMsg()
        // 修改页面样式
        const timer = setInterval(() => {
          this.codeSec = this.codeSec - 1
          this.codeMsg = this.codeSec + 's后重试'
          this.showBtn = false
          if (this.codeSec === 0) {
            clearInterval(timer)
            this.codeSec = 60
            this.showBtn = true
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
  position: relative;
  .icon{
    position: absolute;
    left: 0.2rem;
  }
  .loginTop {
    margin-top: 1rem;
    h1 {
      font-size: 0.8rem;
      font-weight: 400;
      // color: #fff;
    }
  }
  .loginContent form {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
    .tel {
      width: 4rem;
      height: 0.8rem;
      font-size: 0.3rem;
      border: 1px solid #aaa;
    }
    .checked {
      .verification {
        width: 2.3rem;
        height: 0.8rem;
        border: 1px solid #aaa;
      }
      .Code {
        height: 0.75rem;
        margin-left: 0.1rem;
        background-color: rgb(238, 230, 230);
        border: 1px solid #aaa;
        border-radius: 0.1rem;
        color: rgb(142, 140, 140);
      }
    }
    button {
      width: 1.6rem;
      height: 0.75rem;
      border: 1px solid #aaa;
    }
  }
}
</style>