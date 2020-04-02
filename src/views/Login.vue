<template>
  <div class="login">
    <div class="login-form">
      <h2>博客后台管理系统</h2>
      <section class="login-name login-wrap">
        <a-input placeholder="请输入登录名" v-model="loginInfo.username" ref="loginNameInput">
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="管理员登录名">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </section>
      <section class="login-pwd login-wrap">
        <a-input placeholder="请输入密码" v-model="loginInfo.password" ref="loginNameInput" type="password">
          <a-icon slot="prefix" type="key" />
          <a-tooltip slot="suffix" title="管理员登录密码">
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </section>
      <section class="login-commit-btn login-wrap">
        <a-button type="primary" class="disable-btn" @click="submit">登录</a-button>
      </section>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
export default {
  name: "login",
  props: {},
  data() {
    return {
      clickAble: false,
      loginInfo: {
        username: "",
        password: ""
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
      submit(){
          let _this=this;
          _this.$post("/api/b/login",{
              name:_this.loginInfo.username,
              password:_this.loginInfo.password,
          }).then((res)=>{
              console.log(res);
              if(res.code!==200){
                  _this.$message.error(res.msg)
                  return
              }
                localStorage['token'] = res.data.token
                 Cookies.set('csrfToken', res.data.token, {
                  expires: 1
                })
                axios.defaults.headers.Authorization = localStorage['token'] || null
                _this.$message.success('登录成功');
                // 给提示留出时间，延迟跳转
                setTimeout(() => {
                  this.$router.push('/')
                }, 1500);
          })
      }
  },
  components: {}
};
</script>
<style>
.disable-btn:before {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: 1;
    display: none;
    background: #fff;
    border-radius: inherit;
    opacity: 0.35;
    transition: opacity 0.2s;
    pointer-events: none;

}
</style>
<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #eee;
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .login-wrap {
      margin-bottom: 14px;
    }
  }
}

</style>

